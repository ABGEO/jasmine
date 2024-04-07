package migrator

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	"gorm.io/gorm"
)

type PlantMigrator struct {
	db *gorm.DB
}

func NewPlantMigrator(db *gorm.DB) *PlantMigrator {
	return &PlantMigrator{
		db: db,
	}
}

func (mig *PlantMigrator) Name() string {
	return "Plant"
}

func (mig *PlantMigrator) Migrate() error {
	return mig.db.AutoMigrate(&model.Plant{})
}
