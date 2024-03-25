package app

import (
	"fmt"

	"github.com/abgeo/jasmine/packages/flora-bridge/broker"
	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	"github.com/abgeo/jasmine/packages/flora-bridge/controller"
	"github.com/abgeo/jasmine/packages/flora-bridge/healthchecker"
	"github.com/abgeo/jasmine/packages/flora-bridge/processor"
	"github.com/abgeo/jasmine/packages/flora-bridge/route"
	"github.com/abgeo/jasmine/packages/flora-bridge/server"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

func provideLogger(conf *config.Config) (*zap.Logger, error) {
	var (
		logger *zap.Logger
		err    error
	)

	if conf.Env == "prod" {
		logger, err = zap.NewProduction()
	} else {
		logger, err = zap.NewDevelopment()
	}

	if err != nil {
		return nil, fmt.Errorf("unable to initialize logger: %w", err)
	}

	return logger, nil
}

func provideEnv(conf *config.Config) string {
	return conf.Env
}

func Provide() fx.Option {
	return fx.Options(
		fx.Provide(
			provideLogger,
			fx.Annotate(
				provideEnv,
				fx.ResultTags(`name:"env"`),
			),
			broker.NewBroker,
			config.New,
			fx.Annotate(
				server.New,
				fx.ParamTags(`name:"env"`, `group:"routes"`, `group:"healthcheckers"`),
			),
		),
		controller.Provide(),
		healthchecker.Provide(),
		processor.Provide(),
		route.Provide(),
	)
}
