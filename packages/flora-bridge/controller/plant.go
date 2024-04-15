package controller

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/abgeo/jasmine/packages/flora-bridge/dto"
	customErrors "github.com/abgeo/jasmine/packages/flora-bridge/errors"
	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	"github.com/abgeo/jasmine/packages/flora-bridge/service"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"go.uber.org/zap"
)

type PlantController struct {
	logger       *zap.Logger
	plantService *service.PlantService
}

func NewPlantController(logger *zap.Logger, plantService *service.PlantService) (*PlantController, error) {
	return &PlantController{
		logger:       logger,
		plantService: plantService,
	}, nil
}

func (ctrl *PlantController) Create(ctx *gin.Context) {
	var (
		entity = &model.Plant{}

		payload  *dto.PlantOnCreate
		response dto.PlantOnResponse
	)

	if err := ctx.ShouldBind(&payload); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	_ = copier.Copy(&entity, &payload)

	plant, err := ctrl.plantService.Create(entity)
	if err != nil {
		ctrl.logger.Error("unable to create plant", zap.Error(err))
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

		return
	}

	_ = copier.Copy(&response, &plant)

	ctx.JSON(http.StatusCreated, response)
}

func (ctrl *PlantController) GetAll(ctx *gin.Context) {
	var response []dto.PlantOnResponse

	plants, err := ctrl.plantService.GetAll()
	if err != nil {
		ctrl.logger.Error("unable to load plants", zap.Error(err))
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

		return
	}

	_ = copier.Copy(&response, &plants)

	ctx.JSON(http.StatusOK, response)
}

func (ctrl *PlantController) GetSingle(ctx *gin.Context) {
	var response dto.PlantOnResponse

	rawID := ctx.Param("id")

	id, err := strconv.Atoi(rawID)
	if err != nil {
		ctrl.logger.Error("invalid ID", zap.Error(err), zap.Any("id", rawID))
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid ID"})

		return
	}

	plants, err := ctrl.plantService.GetSingle(id)
	if err != nil {
		ctrl.logger.Error("unable to load plant", zap.Error(err))

		statusCode := http.StatusInternalServerError
		if errors.Is(err, customErrors.ErrPlantNotFound) {
			statusCode = http.StatusNotFound
		}

		ctx.AbortWithStatusJSON(statusCode, gin.H{"error": err.Error()})

		return
	}

	_ = copier.Copy(&response, &plants)

	ctx.JSON(http.StatusOK, response)
}

func (ctrl *PlantController) Update(ctx *gin.Context) {
	var (
		entity = &model.Plant{}

		payload  *dto.PlantOnUpdate
		response dto.PlantOnResponse
	)

	if err := ctx.ShouldBind(&payload); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	_ = copier.Copy(&entity, &payload)

	plant, err := ctrl.plantService.Update(entity)
	if err != nil {
		ctrl.logger.Error("unable to create plant", zap.Error(err))

		statusCode := http.StatusInternalServerError
		if errors.Is(err, customErrors.ErrPlantNotFound) {
			statusCode = http.StatusNotFound
		}

		ctx.AbortWithStatusJSON(statusCode, gin.H{"error": err.Error()})

		return
	}

	_ = copier.Copy(&response, &plant)

	ctx.JSON(http.StatusOK, response)
}

func (ctrl *PlantController) Delete(ctx *gin.Context) {
	rawID := ctx.Param("id")

	id, err := strconv.Atoi(rawID)
	if err != nil {
		ctrl.logger.Error("invalid ID", zap.Error(err), zap.Any("id", rawID))
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid ID"})

		return
	}

	err = ctrl.plantService.Delete(id)
	if err != nil {
		ctrl.logger.Error("unable to delete plant", zap.Error(err))

		statusCode := http.StatusInternalServerError
		if errors.Is(err, customErrors.ErrPlantNotFound) {
			statusCode = http.StatusNotFound
		}

		ctx.AbortWithStatusJSON(statusCode, gin.H{"error": err.Error()})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{})
}
