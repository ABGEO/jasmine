package dto

import (
	"time"
)

type Plant struct {
	Pid string `json:"pid" binding:"required"`
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
