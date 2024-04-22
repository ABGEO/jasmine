package route

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/controller"
	"github.com/abgeo/jasmine/packages/flora-bridge/middleware"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type FileRoute struct {
	controller     *controller.FileController
	authMiddleware *middleware.AuthMiddleware
	logger         *zap.Logger
}

func NewFileRoute(
	controller *controller.FileController,
	authMiddleware *middleware.AuthMiddleware,
	logger *zap.Logger,
) *FileRoute {
	return &FileRoute{
		controller:     controller,
		authMiddleware: authMiddleware,
		logger:         logger,
	}
}

func (route *FileRoute) Register(engine *gin.Engine) {
	route.logger.Debug("registering route", zap.String("route", "file"))

	group := engine.Group("/file")
	{
		group.POST(
			"/upload",
			route.authMiddleware.Handler(),
			route.controller.Upload,
		)
	}
}
