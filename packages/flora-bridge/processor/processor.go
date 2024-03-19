package processor

import (
	mqtt "github.com/eclipse/paho.mqtt.golang"
	"go.uber.org/fx"
)

type Processor interface {
	Topic() string
	Handler(client mqtt.Client, msg mqtt.Message)
}

func AsProcessor(fc any, annotations ...fx.Annotation) any {
	annotations = append(
		annotations,
		fx.As(new(Processor)),
		fx.ResultTags(`group:"processors"`),
	)

	return fx.Annotate(fc, annotations...)
}

func Provide() fx.Option {
	return fx.Provide(
		AsProcessor(NewMeasurementProcessor),
	)
}
