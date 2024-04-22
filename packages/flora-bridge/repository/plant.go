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
		Joins("Avatar").
		Find(&plants).
		Error
}

func (repo *PlantRepository) FindByID(id int) (*model.Plant, error) {
	var plant model.Plant

	return &plant, repo.db.
		Joins("Avatar").
		First(&plant, id).
		Error
}

func (repo *PlantRepository) UpdateAvatar(plant *model.Plant, avatarID uint) error {
	tx := repo.db.
		Model(plant).
		Association("Avatar")

	if avatarID == 0 {
		if err := tx.Delete(plant.Avatar); err != nil {
			return fmt.Errorf("unable to remove avatar reference: %w", err)
		}
	}

	err := tx.Replace(&model.File{
		Model: model.Model{
			ID: avatarID,
		},
	})
	if err != nil {
		return fmt.Errorf("unable to replace avatar reference: %w", err)
	}

	return nil
}

func (repo *PlantRepository) Update(plant *model.Plant) error {
	return repo.db.
		Omit("Avatar").
		Omit("AvatarID").
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
