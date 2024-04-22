"use client";

import { ImageSelector } from "../ImageSelector";
import { useEffect, useState } from "react";

import { Button, Fieldset, Grid, Modal, Text, TextInput } from "@mantine/core";
import { FileRejection, FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconExclamationMark } from "@tabler/icons-react";

import { Destination, FileRepository } from "@/lib/repositories/file";
import { PlantRepository } from "@/lib/repositories/plant";
import {
  PlantOnCreate,
  PlantOnResponse,
  PlantOnUpdate,
} from "@/types/dtos/plant";

interface FormValues {
  pid: string;
  avatar: FileWithPath | null;
}

interface PlantFormModalProps {
  plant?: PlantOnResponse;
  onClose: () => void;
}

export function PlantFormModal({ plant, onClose }: PlantFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentAvatar, setCurrentAvatar] = useState<FileWithPath>();

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: { pid: plant?.pid ?? "", avatar: null },

    validate: {
      pid: (value) => (value.length <= 0 ? "Pid must not be empty" : null),
    },
  });

  const isEdit = plant != undefined && plant != undefined;

  useEffect(() => {
    const getPlantImage = async (plant: PlantOnResponse) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_S3_URL}/${plant.avatar.key}`,
      );
      const data = await response.blob();

      const image = new File([data], plant.avatar.originalName, {
        type: plant.avatar.mimeType,
      });

      setCurrentAvatar(image);
    };

    if (isEdit && plant.avatar.key != "") {
      getPlantImage(plant);
    }
  }, [isEdit, plant, setCurrentAvatar]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleError = (_: typeof form.errors) => {
    notifications.show({
      color: "red",
      icon: <IconExclamationMark />,
      title: "Validation Error!",
      message: "Please fill all the required fields.",
    });

    setIsSubmitting(false);
  };

  const handleSubmit = async (values: typeof form.values) => {
    const avatarId = await uploadAvatar(values.avatar);
    const plantSaved = await savePlant({
      id: plant?.id ?? 0,
      pid: values.pid,
      avatarId: avatarId ?? 0,
    });

    setIsSubmitting(false);

    if (plantSaved) {
      handleClose();
    }
  };

  const uploadAvatar = async (
    avatar: FileWithPath | null,
  ): Promise<number | null> => {
    if (!avatar) {
      return plant?.avatar?.id ?? null;
    }

    return FileRepository.upload(avatar, Destination.Avatar)
      .then((data) => {
        return data.id;
      })
      .catch((reason) => {
        notifications.show({
          color: "red",
          icon: <IconExclamationMark />,
          title: "Oops!",
          message: `Something went wrong and we couldn't upload avatar. Please try again later. ${reason.response.data.error}`,
        });

        return null;
      });
  };

  const savePlant = async (
    entity: PlantOnCreate | PlantOnUpdate,
  ): Promise<boolean> => {
    const request = isEdit
      ? PlantRepository.update(entity as PlantOnUpdate)
      : PlantRepository.create(entity as PlantOnCreate);

    return request
      .then(() => {
        if (isEdit) {
          notifications.show({
            color: "green",
            icon: <IconCheck />,
            title: "Success!",
            message: "Your plant has been updated with the latest changes.",
          });
        } else {
          notifications.show({
            color: "green",
            icon: <IconCheck />,

            title: "Congratulations!",
            message:
              "Your new plant has been successfully added to the garden.",
          });
        }

        return true;
      })
      .catch((reason) => {
        notifications.show({
          color: "red",
          icon: <IconExclamationMark />,
          title: "Oops!",
          message: `Something went wrong and we couldn't ${isEdit ? "edit" : "create"} the plant.
                    Please try again later.
                    ${reason.response.data.error}`,
        });

        return false;
      });
  };

  return (
    <Modal
      title={`${isEdit ? "Edit" : "Create"} Plant`}
      opened={true}
      onClose={handleClose}
      centered
    >
      <form
        onSubmit={(e) => {
          const handler = form.onSubmit(handleSubmit, handleError);

          e.preventDefault();
          setIsSubmitting(true);
          handler();
        }}
      >
        <Fieldset disabled={isSubmitting} variant="unstyled">
          <Grid>
            <Grid.Col span={{ base: 6 }}>
              <label>
                Avatar
                <ImageSelector
                  image={currentAvatar}
                  onDrop={(files: FileWithPath[]) =>
                    form.setFieldValue("avatar", files[0])
                  }
                  onReject={(fileRejections: FileRejection[]) => {
                    form.setFieldError(
                      "avatar",
                      fileRejections[0]?.errors[0]?.message ??
                        "Select images only",
                    );
                  }}
                  onClear={() => {
                    form.setFieldValue("avatar", null);

                    if (isEdit) {
                      plant.avatar.id = 0;
                    }
                  }}
                />
              </label>

              {form.errors.avatar && (
                <Text c="red" mt={5}>
                  {form.errors.avatar}
                </Text>
              )}
            </Grid.Col>

            <Grid.Col span={{ base: 6 }}>
              <TextInput
                data-autofocus
                label="Pid"
                placeholder="Pid"
                {...form.getInputProps("pid")}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Button type="submit" mt="sm" loading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}
