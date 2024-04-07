package route

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/controller"
	"github.com/abgeo/jasmine/packages/flora-bridge/middleware"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type PlantRoute struct {
	controller     *controller.PlantController
	authMiddleware *middleware.AuthMiddleware
	logger         *zap.Logger
}

func NewPlantRoute(
	controller *controller.PlantController,
	authMiddleware *middleware.AuthMiddleware,
	logger *zap.Logger,
) *PlantRoute {
	return &PlantRoute{
		controller:     controller,
		authMiddleware: authMiddleware,
		logger:         logger,
	}
}

func (route *PlantRoute) Register(engine *gin.Engine) {
	route.logger.Debug("registering route", zap.String("route", "plant"))

	group := engine.Group("/plant", route.authMiddleware.Handler())
	{
		group.POST(
			"",
			route.controller.Create,
		)
	}
}
