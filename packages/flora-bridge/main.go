package main

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/app"
	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
	"go.uber.org/zap"
)

func main() {
	fxApp := fx.New(
		fx.WithLogger(func(logger *zap.Logger) fxevent.Logger {
			return &fxevent.ZapLogger{Logger: logger}
		}),
		app.Provide(),
		fx.Invoke(app.Run),
	)

	fxApp.Run()
}
