package repository

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	"gorm.io/gorm"
)

type PlantRepository struct {
	db *gorm.DB
}

func NewPlantRepository(db *gorm.DB) *PlantRepository {
	return &PlantRepository{
		db: db,
	}
}

func (repo *PlantRepository) Create(plant *model.Plant) error {
	return repo.db.
		Create(plant).
		Error
}

func (repo *PlantRepository) FindAll() ([]model.Plant, error) {
	var plants []model.Plant

	return plants, repo.db.
		Find(&plants).
		Error
}
