package dto

import (
	"time"
)

type Plant struct {
	Pid              string    `json:"pid" binding:"required"`
	Birthday         time.Time `json:"birthday" binding:"required"`
	ScientificName   string    `json:"scientificName" binding:"required"`
	Type             string    `json:"type" binding:"required"`
	Genus            string    `json:"genus" binding:"required"`
	Family           string    `json:"family" binding:"required"`
	BloomTime        string    `json:"bloomTime" binding:"required"`
	BloomDescription string    `json:"bloomDescription"`
	Sunlight         string    `json:"sunlight" binding:"required"`
	Watering         string    `json:"watering" binding:"required"`
	SoilType         string    `json:"soilType" binding:"required"`
	Flowers          []string  `json:"flowers"`
	Fruit            string    `json:"fruit"`
	Leaves           []string  `json:"leaves"`
	Notes            string    `json:"notes"`
}

type PlantOnCreate struct {
	Plant
	AvatarID uint `json:"avatarId"`
}

type PlantOnUpdate struct {
	Plant
	AvatarID uint `json:"avatarId"`
	ID       uint `json:"id" binding:"required"`
}

type PlantOnResponse struct {
	Plant
	ID        uint           `json:"id" binding:"required"`
	CreatedAt time.Time      `json:"createdAt" binding:"required"`
	UpdatedAt time.Time      `json:"updatedAt" binding:"required"`
	Avatar    FileOnResponse `json:"avatar"`
}
