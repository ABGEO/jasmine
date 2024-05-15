package service

import (
	"errors"
	"fmt"

	customErrors "github.com/abgeo/jasmine/packages/flora-bridge/errors"
	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	"github.com/abgeo/jasmine/packages/flora-bridge/repository"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type PlantService struct {
	logger    *zap.Logger
	plantRepo *repository.PlantRepository
}

func NewPlantService(
	logger *zap.Logger,
	plantRepo *repository.PlantRepository,
) *PlantService {
	return &PlantService{
		logger:    logger,
		plantRepo: plantRepo,
	}
}

func (svc *PlantService) Create(entity *model.Plant) (*model.Plant, error) {
	if err := svc.plantRepo.Create(entity); err != nil {
		return nil, fmt.Errorf("unable to create Plant: %w", err)
	}

	return entity, nil
}

func (svc *PlantService) GetAll() ([]model.Plant, error) {
	plants, err := svc.plantRepo.FindAll()
	if err != nil {
		return nil, fmt.Errorf("unable to load Plants: %w", err)
	}

	return plants, nil
}

func (svc *PlantService) GetSingle(id int) (*model.Plant, error) {
	plant, err := svc.plantRepo.FindByID(id)

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, customErrors.ErrPlantNotFound
	}

	return plant, nil
}

func (svc *PlantService) Update(updates *model.Plant) (*model.Plant, error) {
	plant, err := svc.GetSingle(int(updates.ID))
	if err != nil {
		return nil, err
	}

	// @todo: refactor!
	plant.Pid = updates.Pid
	plant.Birthday = updates.Birthday
	plant.ScientificName = updates.ScientificName
	plant.Type = updates.Type
	plant.Genus = updates.Genus
	plant.Family = updates.Family
	plant.BloomTime = updates.BloomTime
	plant.BloomDescription = updates.BloomDescription
	plant.Sunlight = updates.Sunlight
	plant.Watering = updates.Watering
	plant.SoilType = updates.SoilType
	plant.Flowers = updates.Flowers
	plant.Fruit = updates.Fruit
	plant.Leaves = updates.Leaves
	plant.Notes = updates.Notes

	if updates.AvatarID != plant.AvatarID {
		if err = svc.plantRepo.UpdateAvatar(plant, updates.AvatarID); err != nil {
			return nil, fmt.Errorf("unable to update Plant Avatar: %w", err)
		}
	}

	if err = svc.plantRepo.Update(plant); err != nil {
		return nil, fmt.Errorf("unable to update Plant: %w", err)
	}

	return plant, nil
}

func (svc *PlantService) Delete(id int) error {
	_, err := svc.GetSingle(id)
	if err != nil {
		return err
	}

	return svc.plantRepo.DeleteByID(id)
}
