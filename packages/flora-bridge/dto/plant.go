package dto

import (
	"time"
)

type Plant struct {
	Pid string `json:"pid" binding:"required"`
}

type PlantOnCreate struct {
	Plant
}

type PlantOnCreateResponse struct {
	Plant
	ID        uint      `json:"id" binding:"required"`
	CreatedAt time.Time `json:"createdAt" binding:"required"`
	UpdatedAt time.Time `json:"updatedAt" binding:"required"`
}
