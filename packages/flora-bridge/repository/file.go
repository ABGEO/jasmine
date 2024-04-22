package repository

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	"gorm.io/gorm"
)

type FileRepository struct {
	db *gorm.DB
}

func NewFileRepository(db *gorm.DB) *FileRepository {
	return &FileRepository{
		db: db,
	}
}

func (repo *FileRepository) Create(file *model.File) error {
	return repo.db.
		Create(file).
		Error
}

func (repo *FileRepository) FindByID(id int) (*model.File, error) {
	var file model.File

	return &file, repo.db.
		First(&file, id).
		Error
}
