package migrator

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	"gorm.io/gorm"
)

type FileMigrator struct {
	db *gorm.DB
}

func NewFileMigrator(db *gorm.DB) *FileMigrator {
	return &FileMigrator{
		db: db,
	}
}

func (mig *FileMigrator) Name() string {
	return "File"
}

func (mig *FileMigrator) Migrate() error {
	return mig.db.AutoMigrate(&model.File{})
}
