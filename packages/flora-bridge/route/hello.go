package route

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/controller"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type HelloRoute struct {
	controller *controller.HelloController
	logger     *zap.Logger
}

func NewHelloRoute(controller *controller.HelloController, logger *zap.Logger) *HelloRoute {
	return &HelloRoute{
		controller: controller,
		logger:     logger,
	}
}

func (route *HelloRoute) Register(engine *gin.Engine) {
	route.logger.Debug("registering route", zap.String("route", "hello"))

	group := engine.Group("/hello")
	{
		group.GET(
			"/world",
			route.controller.Hello,
		)
	}
}
