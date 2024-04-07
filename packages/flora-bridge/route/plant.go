package route

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/controller"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type PlantRoute struct {
	controller *controller.PlantController
	logger     *zap.Logger
}

func NewPlantRoute(controller *controller.PlantController, logger *zap.Logger) *PlantRoute {
	return &PlantRoute{
		controller: controller,
		logger:     logger,
	}
}

func (route *PlantRoute) Register(engine *gin.Engine) {
	route.logger.Debug("registering route", zap.String("route", "plant"))

	group := engine.Group("/plant")
	{
		group.POST(
			"",
			route.controller.Create,
		)
	}
}
