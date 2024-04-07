package migrator

import (
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type IMigrator interface {
	Name() string
	Migrate() error
}

func AsMigrator(fc any, annotations ...fx.Annotation) any {
	annotations = append(
		annotations,
		fx.As(new(IMigrator)),
		fx.ResultTags(`group:"migrators"`),
	)

	return fx.Annotate(fc, annotations...)
}

func Migrate(logger *zap.Logger, migrators ...IMigrator) {
	for _, migrator := range migrators {
		logger.Debug("Executing Migration", zap.String("migrator", migrator.Name()))

		if err := migrator.Migrate(); err != nil {
			logger.Error(
				"Unable to execute migration",
				zap.String("migrator", migrator.Name()),
				zap.Error(err),
			)
		}
	}
}

func Provide() fx.Option {
	return fx.Provide(
		AsMigrator(NewPlantMigrator),
	)
}
