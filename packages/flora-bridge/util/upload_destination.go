package util

type UploadDestination int

const (
	UploadDestinationUpload UploadDestination = iota
	UploadDestinationAvatar
)

func (destination UploadDestination) String() string {
	mapping := []string{
		UploadDestinationUpload: "upload",
		UploadDestinationAvatar: "avatar",
	}

	return mapping[destination]
}

func MapUploadDestination(raw string) UploadDestination {
	mapping := map[string]UploadDestination{
		"avatar": UploadDestinationAvatar,
	}

	if raw == "" {
		return UploadDestinationUpload
	}

	if destination, ok := mapping[raw]; ok {
		return destination
	}

	return UploadDestinationUpload
}
