package controller

import (
	"net/http"

	"github.com/abgeo/jasmine/packages/flora-bridge/dto"
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
		response dto.PlantOnCreateResponse
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
