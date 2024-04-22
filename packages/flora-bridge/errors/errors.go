package errors

import "errors"

var (
	ErrPlantNotFound   = errors.New("plant not found")
	ErrInvalidMIMEType = errors.New("MIME Type is not allowed")
)
