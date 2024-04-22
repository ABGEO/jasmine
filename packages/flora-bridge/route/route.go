package route

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/fx"
)

type IRoute interface {
	Register(engine *gin.Engine)
}

func AsRoute(fc any, annotations ...fx.Annotation) any {
	annotations = append(
		annotations,
		fx.As(new(IRoute)),
		fx.ResultTags(`group:"routes"`),
	)

	return fx.Annotate(fc, annotations...)
}

func RegisterRoutes(engine *gin.Engine, routes ...IRoute) {
	for _, route := range routes {
		route.Register(engine)
	}
}

func Provide() fx.Option {
	return fx.Provide(
		AsRoute(NewFileRoute),
		AsRoute(NewPlantRoute),
	)
}
