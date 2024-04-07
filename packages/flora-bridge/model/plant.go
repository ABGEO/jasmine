package model

import "gorm.io/gorm"

type Plant struct {
	gorm.Model
	Pid string `gorm:"unique"`
}
