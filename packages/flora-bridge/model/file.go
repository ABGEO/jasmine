package model

type File struct {
	Model
	MIMEType     string
	Key          string
	Size         int64
	ETag         string
	OriginalName string
}
