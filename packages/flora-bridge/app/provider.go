package app

import (
	"fmt"
	"net"

	"github.com/abgeo/jasmine/packages/flora-bridge/broker"
	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	"github.com/abgeo/jasmine/packages/flora-bridge/controller"
	"github.com/abgeo/jasmine/packages/flora-bridge/healthchecker"
	"github.com/abgeo/jasmine/packages/flora-bridge/migrator"
	"github.com/abgeo/jasmine/packages/flora-bridge/processor"
	"github.com/abgeo/jasmine/packages/flora-bridge/repository"
	"github.com/abgeo/jasmine/packages/flora-bridge/route"
	"github.com/abgeo/jasmine/packages/flora-bridge/server"
	"github.com/abgeo/jasmine/packages/flora-bridge/service"
	"go.uber.org/fx"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
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

func provideDatabase(config *config.Config) (*gorm.DB, error) {
	url := fmt.Sprintf(
		"postgres://%s:%s@%s/%s",
		config.Database.User,
		config.Database.Password,
		net.JoinHostPort(config.Database.Host, config.Database.Port),
		config.Database.Database,
	)
	gormConfig := gorm.Config{}

	db, err := gorm.Open(postgres.Open(url), &gormConfig)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %w", err)
	}

	return db, nil
}

func Provide() fx.Option {
	return fx.Options(
		fx.Provide(
			provideLogger,
			provideDatabase,
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
		migrator.Provide(),
		processor.Provide(),
		repository.Provide(),
		route.Provide(),
		service.Provide(),
	)
}
