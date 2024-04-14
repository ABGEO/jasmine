package service

import (
	"fmt"

	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	"github.com/abgeo/jasmine/packages/flora-bridge/repository"
	"go.uber.org/zap"
)

type PlantService struct {
	logger    *zap.Logger
	plantRepo *repository.PlantRepository
}

func NewPlantService(
	plantRepo *repository.PlantRepository,
	logger *zap.Logger,
) *PlantService {
	return &PlantService{
		plantRepo: plantRepo,
		logger:    logger,
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
