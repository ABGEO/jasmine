package model

type Plant struct {
	Model
	Pid string `gorm:"unique"`
}
