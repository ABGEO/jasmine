package util

import (
	"bytes"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"io"
	"mime/multipart"

	"github.com/disintegration/imaging"
)

type (
	DestinationConverter  func(file *multipart.FileHeader, fileHandler multipart.File) (multipart.File, error)
	DestinationConverters []DestinationConverter
)

type sectionReadCloser struct {
	*io.SectionReader
	io.Closer
}

func (rc sectionReadCloser) Close() error {
	if rc.Closer != nil {
		if err := rc.Closer.Close(); err != nil {
			return fmt.Errorf("unable to close resource: %w", err)
		}
	}

	return nil
}

func GetDestinationConverterMapping() map[UploadDestination]DestinationConverters {
	return map[UploadDestination]DestinationConverters{
		UploadDestinationAvatar: {
			PNGConverterFilter,
			AvatarCropFilter,
		},
	}
}

func PNGConverterFilter(file *multipart.FileHeader, fileHandler multipart.File) (multipart.File, error) {
	switch file.Header.Get("Content-Type") {
	case "image/jpeg":
		return convertJPEGtoPNG(file, fileHandler)
	default:
		return fileHandler, nil
	}
}

func convertJPEGtoPNG(file *multipart.FileHeader, fileHandler multipart.File) (multipart.File, error) {
	img, err := jpeg.Decode(fileHandler)
	if err != nil {
		return nil, fmt.Errorf("unable to decode JPEG: %w", err)
	}

	reader, err := encodeImageToPNGReader(img)
	if err != nil {
		return nil, fmt.Errorf("unable to encode image: %w", err)
	}

	file.Header.Set("Content-Type", "image/png")
	file.Size = reader.Size()

	return reader, nil
}

func encodeImageToPNGReader(img image.Image) (*sectionReadCloser, error) {
	buf := new(bytes.Buffer)
	if err := png.Encode(buf, img); err != nil {
		return nil, fmt.Errorf("unable to encode PNG: %w", err)
	}

	bufBytes := buf.Bytes()
	reader := io.NewSectionReader(bytes.NewReader(bufBytes), 0, int64(len(bufBytes)))

	return &sectionReadCloser{reader, nil}, nil
}

func AvatarCropFilter(file *multipart.FileHeader, fileHandler multipart.File) (multipart.File, error) {
	const (
		avatarWidth  = 1920
		avatarHeight = 1080
	)

	img, err := png.Decode(fileHandler)
	if err != nil {
		return nil, fmt.Errorf("unable to decode PNG: %w", err)
	}

	dstImageFill := imaging.Fill(img, avatarWidth, avatarHeight, imaging.Center, imaging.Lanczos)

	reader, err := encodeImageToPNGReader(dstImageFill)
	if err != nil {
		return nil, err
	}

	file.Size = reader.Size()

	return reader, nil
}
