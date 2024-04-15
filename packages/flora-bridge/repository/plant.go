package repository

import (
	"fmt"

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

func (repo *PlantRepository) FindByID(id int) (*model.Plant, error) {
	var plant model.Plant

	return &plant, repo.db.
		First(&plant, id).
		Error
}

func (repo *PlantRepository) Update(plant *model.Plant) error {
	return repo.db.
		Save(plant).
		Error
}

func (repo *PlantRepository) DeleteByID(id int) error {
	err := repo.db.
		Delete(&model.Plant{}, id).
		Error
	if err != nil {
		return fmt.Errorf("unable to delete Website: %w", err)
	}

	return nil
}
