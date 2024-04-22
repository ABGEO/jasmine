package model

type Plant struct {
	Model
	Pid      string `gorm:"unique"`
	AvatarID uint   `gorm:"default:null"`
	Avatar   File
}
