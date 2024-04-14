"use client";

import { useState } from "react";

import { Button, Fieldset, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconExclamationMark } from "@tabler/icons-react";

import { PlantRepository } from "@/lib/repositories/plant";
import { PlantOnCreateResponse } from "@/types/dtos/plant";

interface PlantFormModalProps {
  plant?: PlantOnCreateResponse;
  open: boolean;
  onClose: () => void;
}

export function PlantFormModal({ plant, open, onClose }: PlantFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { pid: "" },

    validate: {
      pid: (value) => (value.length <= 0 ? "Pid must not be empty" : null),
    },
  });

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

  const handleSubmit = (values: typeof form.values) => {
    // @todo: call create or edit method conditionally.
    PlantRepository.create({ pid: values.pid })
      .then(() => {
        if (plant == null) {
          notifications.show({
            color: "green",
            icon: <IconCheck />,

            title: "Congratulations!",
            message:
              "Your new plant has been successfully added to the garden.",
          });
        } else {
          notifications.show({
            color: "green",
            icon: <IconCheck />,
            title: "Success!",
            message: "Your plant has been updated with the latest changes.",
          });
        }

        handleClose();
      })
      .catch((reason) => {
        notifications.show({
          color: "red",
          icon: <IconExclamationMark />,
          title: "Oops!",
          message: `Something went wrong and we couldn't ${plant == null ? "create" : "edit"} the plant.
                    Please try again later.
                    ${reason.response.data.error}`,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Modal
      title={`${plant == null ? "Create" : "Edit"} Plant`}
      opened={open}
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
          <TextInput
            data-autofocus
            label="Pid"
            placeholder="Pid"
            {...form.getInputProps("pid")}
          />
        </Fieldset>

        <Button type="submit" mt="sm" loading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}
