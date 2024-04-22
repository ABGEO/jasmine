package util

import (
	"mime/multipart"

	customErrors "github.com/abgeo/jasmine/packages/flora-bridge/errors"
)

type (
	DestinationFilter  func(file *multipart.FileHeader) error
	DestinationFilters []DestinationFilter
)

func GetDestinationFiltersMapping() map[UploadDestination]DestinationFilters {
	return map[UploadDestination]DestinationFilters{
		UploadDestinationUpload: {
			UnknownMIMETypeFilter,
		},
		UploadDestinationAvatar: {
			ImageMIMETypeFilter,
		},
	}
}

func UnknownMIMETypeFilter(_ *multipart.FileHeader) error {
	return customErrors.ErrInvalidMIMEType
}

func ImageMIMETypeFilter(file *multipart.FileHeader) error {
	allowedTypes := []string{
		"image/jpeg",
		"image/png",
	}

	MIMEType := file.Header.Get("Content-Type")

	for _, item := range allowedTypes {
		if item == MIMEType {
			return nil
		}
	}

	return customErrors.ErrInvalidMIMEType
}
