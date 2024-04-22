"use client";

import { useEffect, useState } from "react";

import { ActionIcon, Box, Image, Text } from "@mantine/core";
import {
  Dropzone,
  FileRejection,
  FileWithPath,
  MIME_TYPES,
} from "@mantine/dropzone";

import { IconTrash } from "@tabler/icons-react";

import classes from "./ImageSelector.module.css";

interface ImageSelectorProps {
  image?: FileWithPath;
  onDrop?: (files: FileWithPath[]) => void;
  onReject?: (fileRejections: FileRejection[]) => void;
  onClear?: () => void;
}

export function ImageSelector({
  image,
  onDrop,
  onReject,
  onClear,
}: ImageSelectorProps) {
  const [preview, setPreview] = useState<FileWithPath | null>(null);

  useEffect(() => {
    if (image) {
      setPreview(image);
    }
  }, [image, setPreview]);

  const handleDrop = (files: FileWithPath[]) => {
    setPreview(files[0]);

    if (onDrop != undefined) {
      onDrop(files);
    }
  };

  const handleReject = (fileRejections: FileRejection[]) => {
    if (onReject != undefined) {
      onReject(fileRejections);
    }
  };

  const handleClear = () => {
    setPreview(null);

    if (onClear != undefined) {
      onClear();
    }
  };

  return (
    <Box className={classes.dropzoneWrapper}>
      {preview && (
        <ActionIcon
          variant="white"
          radius="md"
          size={45}
          className={classes.clearAction}
        >
          <IconTrash
            className={classes.clearIcon}
            stroke={1.5}
            onClick={handleClear}
          />
        </ActionIcon>
      )}

      <Dropzone
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        maxSize={3 * 1024 ** 2}
        multiple={false}
        onDrop={handleDrop}
        onReject={handleReject}
      >
        {preview && (
          <>
            <Image
              src={URL.createObjectURL(preview)}
              onLoad={() => URL.revokeObjectURL(URL.createObjectURL(preview))}
              alt="image preview"
              pb="sm"
            />
            <Text ta="center" truncate>
              {preview.name}
            </Text>
            <Text ta="center">{(preview.size / 1024).toFixed(2)} KiB</Text>
            <Text ta="center" pt="xs" c="dimmed">
              Drop image here to replace
            </Text>
          </>
        )}

        {!preview && (
          <Text ta="center" c="dimmed">
            Drop image here
          </Text>
        )}
      </Dropzone>
    </Box>
  );
}
