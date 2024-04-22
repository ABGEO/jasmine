package controller

import (
	"errors"
	"net/http"

	"github.com/abgeo/jasmine/packages/flora-bridge/dto"
	customErrors "github.com/abgeo/jasmine/packages/flora-bridge/errors"
	"github.com/abgeo/jasmine/packages/flora-bridge/service"
	"github.com/abgeo/jasmine/packages/flora-bridge/util"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"go.uber.org/zap"
)

type FileController struct {
	logger      *zap.Logger
	fileService *service.FileService
}

func NewFileController(logger *zap.Logger, fileService *service.FileService) (*FileController, error) {
	return &FileController{
		logger:      logger,
		fileService: fileService,
	}, nil
}

func (ctrl *FileController) Upload(ctx *gin.Context) {
	var (
		payload  *dto.FileUpload
		response dto.FileOnResponse
	)

	if err := ctx.ShouldBind(&payload); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	destination := util.MapUploadDestination(ctx.Query("destination"))

	entity, err := ctrl.fileService.Upload(payload.File, destination)
	if err != nil {
		ctrl.logger.Error("unable to upload file", zap.Error(err))

		statusCode := http.StatusInternalServerError
		if errors.Is(err, customErrors.ErrInvalidMIMEType) {
			statusCode = http.StatusBadRequest
		}

		ctx.AbortWithStatusJSON(statusCode, gin.H{"error": err.Error()})

		return
	}

	_ = copier.Copy(&response, &entity)

	ctx.JSON(http.StatusCreated, response)
}
