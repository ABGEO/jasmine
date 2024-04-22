package dto

import (
	"mime/multipart"
	"time"
)

type FileUpload struct {
	File *multipart.FileHeader `form:"file" binding:"required"`
}

type FileOnResponse struct {
	ID           uint      `json:"id" binding:"required"`
	CreatedAt    time.Time `json:"createdAt" binding:"required"`
	UpdatedAt    time.Time `json:"updatedAt" binding:"required"`
	MIMEType     string    `json:"mimeType" binding:"required"`
	Key          string    `json:"key" binding:"required"`
	Size         int64     `json:"size" binding:"required"`
	ETag         string    `json:"eTag" binding:"required"`
	OriginalName string    `json:"originalName" binding:"required"`
}
