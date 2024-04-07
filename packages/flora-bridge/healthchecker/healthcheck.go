package healthchecker

import (
	"github.com/tavsec/gin-healthcheck/checks"
	"go.uber.org/fx"
)

func AsHealthChecker(fc any, annotations ...fx.Annotation) any {
	annotations = append(
		annotations,
		fx.As(new(checks.Check)),
		fx.ResultTags(`group:"healthcheckers"`),
	)

	return fx.Annotate(fc, annotations...)
}

func Provide() fx.Option {
	return fx.Provide(
		AsHealthChecker(NewInfluxHealthChecker),
		AsHealthChecker(NewPostgresHealthChecker),
	)
}
