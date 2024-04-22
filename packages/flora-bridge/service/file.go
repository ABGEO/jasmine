package service

import (
	"fmt"
	"mime/multipart"
	"regexp"
	"strconv"

	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	"github.com/abgeo/jasmine/packages/flora-bridge/repository"
	"github.com/abgeo/jasmine/packages/flora-bridge/util"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

type FileService struct {
	logger   *zap.Logger
	config   *config.Config
	fileRepo *repository.FileRepository

	awsSession            *session.Session
	s3Service             *s3.S3
	destinationFilters    map[util.UploadDestination]util.DestinationFilters
	destinationConverters map[util.UploadDestination]util.DestinationConverters
}

func NewFileService(
	logger *zap.Logger,
	config *config.Config,
	fileRepo *repository.FileRepository,
) (*FileService, error) {
	sess, err := session.NewSession(&aws.Config{
		Endpoint:         &config.S3.Endpoint,
		Region:           &config.S3.Region,
		Credentials:      credentials.NewStaticCredentials(config.S3.AccessKeyID, config.S3.SecretKey, ""),
		S3ForcePathStyle: aws.Bool(true),
	})
	if err != nil {
		return nil, fmt.Errorf("unable to create S3 Session: %w", err)
	}

	return &FileService{
		logger:                logger,
		config:                config,
		fileRepo:              fileRepo,
		awsSession:            sess,
		s3Service:             s3.New(sess),
		destinationFilters:    util.GetDestinationFiltersMapping(),
		destinationConverters: util.GetDestinationConverterMapping(),
	}, nil
}

func (svc *FileService) Upload(file *multipart.FileHeader, destination util.UploadDestination) (*model.File, error) {
	if err := svc.applyDestinationFilters(file, destination); err != nil {
		return nil, err
	}

	fileHandler, err := file.Open()
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %w", err)
	}
	defer fileHandler.Close()

	fileHandler, err = svc.applyDestinationConverters(file, fileHandler, destination)
	if err != nil {
		return nil, err
	}

	result, key, err := svc.uploadToS3(file, fileHandler, destination)
	if err != nil {
		return nil, err
	}

	entity, err := svc.createEntity(result, key, file)
	if err != nil {
		return nil, err
	}

	return entity, nil
}

func (svc *FileService) GetFileExtension(file *multipart.FileHeader) string {
	switch file.Header.Get("Content-Type") {
	case "image/jpeg":
		return ".jpg"
	case "image/png":
		return ".png"
	default:
		return ""
	}
}

func (svc *FileService) uploadToS3(
	file *multipart.FileHeader,
	fileHandler multipart.File,
	destination util.UploadDestination,
) (*s3.PutObjectOutput, string, error) {
	key := fmt.Sprintf("%s/%s%s", destination, uuid.New(), svc.GetFileExtension(file))

	result, err := svc.s3Service.PutObject(&s3.PutObjectInput{
		Body:          fileHandler,
		Bucket:        &svc.config.S3.Bucket,
		Key:           &key,
		ContentLength: aws.Int64(file.Size),
		ContentType:   aws.String(file.Header.Get("Content-Type")),
	})
	if err != nil {
		return nil, "", fmt.Errorf("failed to put object in blob storage: %w", err)
	}

	return result, key, nil
}

func (svc *FileService) createEntity(
	putObjectOutput *s3.PutObjectOutput,
	key string,
	file *multipart.FileHeader,
) (*model.File, error) {
	ETag, _ := strconv.Unquote(*putObjectOutput.ETag)

	entity := &model.File{
		MIMEType:     file.Header.Get("Content-Type"),
		Key:          key,
		Size:         file.Size,
		ETag:         ETag,
		OriginalName: getFilename(file),
	}

	if err := svc.fileRepo.Create(entity); err != nil {
		return nil, err
	}

	return entity, nil
}

func (svc *FileService) applyDestinationFilters(file *multipart.FileHeader, destination util.UploadDestination) error {
	filters, ok := svc.destinationFilters[destination]
	if !ok {
		return nil
	}

	for _, filter := range filters {
		if err := filter(file); err != nil {
			return err
		}
	}

	return nil
}

func (svc *FileService) applyDestinationConverters(
	file *multipart.FileHeader,
	fileHandler multipart.File,
	destination util.UploadDestination,
) (multipart.File, error) {
	var err error

	converters, ok := svc.destinationConverters[destination]
	if !ok {
		return nil, nil
	}

	for _, converter := range converters {
		if fileHandler, err = converter(file, fileHandler); err != nil {
			return nil, err
		}
	}

	return fileHandler, nil
}

func getFilename(file *multipart.FileHeader) string {
	return regexp.MustCompile(`[^a-zA-Z0-9-_.]+`).
		ReplaceAllString(file.Filename, "")
}
