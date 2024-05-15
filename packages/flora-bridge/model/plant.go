package model

import "gorm.io/datatypes"

type Plant struct {
	Model
	Pid              string `gorm:"unique"`
	Birthday         datatypes.Date
	ScientificName   string
	Type             string
	Genus            string
	Family           string
	BloomTime        string
	BloomDescription string
	Sunlight         string
	Watering         string
	SoilType         string
	Flowers          datatypes.JSONSlice[string]
	Fruit            string
	Leaves           datatypes.JSONSlice[string]
	Notes            string
	AvatarID         uint `gorm:"default:null"`
	Avatar           File
}
