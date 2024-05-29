"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Card,
  em,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  MultiSelect,
  Select,
  Space,
  Stepper,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FileRejection, FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import {
  IconArticle,
  IconCheck,
  IconClipboardHeart,
  IconExclamationMark,
  IconGrowth,
  IconHierarchy,
  IconSettings,
} from "@tabler/icons-react";

import { ImageSelector } from "@/components/ImageSelector";

import { Destination, FileRepository } from "@/lib/repositories/file";
import { PlantRepository } from "@/lib/repositories/plant";
import {
  PlantOnCreate,
  PlantOnResponse,
  PlantOnUpdate,
} from "@/types/dtos/plant";

const WIZARD_STEPS = 5;

interface FormValues {
  pid: string;
  avatar: FileWithPath | null;
  birthday: Date;
  scientificName: string;
  type: string;
  genus: string;
  family: string;
  bloomTime: string;
  bloomDescription: string;
  sunlight: string;
  watering: string;
  soilType: string;
  flowers: string[];
  fruit: string;
  leaves: string[];
  notes: string;
}

interface PlantFormProps {
  plant?: PlantOnResponse;
}

export function PlantForm({ plant }: PlantFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentAvatar, setCurrentAvatar] = useState<FileWithPath>();
  const [wizardIndex, setWizardIndex] = useState<number>(0);

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      pid: plant?.pid ?? "",
      avatar: null,
      birthday: plant?.birthday ? new Date(plant.birthday) : new Date(),
      scientificName: plant?.scientificName ?? "",

      type: plant?.type ?? "",
      genus: plant?.genus ?? "",
      family: plant?.family ?? "",

      bloomTime: plant?.bloomTime ?? "",
      bloomDescription: plant?.bloomDescription ?? "",

      sunlight: plant?.sunlight ?? "",
      watering: plant?.watering ?? "",
      soilType: plant?.soilType ?? "",

      flowers: plant?.flowers ?? [],
      fruit: plant?.fruit ?? "",
      leaves: plant?.leaves ?? [],
      notes: plant?.notes ?? "",
    },

    validate: (values) => {
      if (wizardIndex === 0) {
        return {
          pid: values.pid.length <= 0 ? "Pid must not be empty" : null,
          scientificName:
            values.scientificName.length <= 0
              ? "Scientific Name must not be empty"
              : null,
        };
      }

      if (wizardIndex === 1) {
        return {
          type: values.type.length <= 0 ? "Type must not be empty" : null,
          genus: values.genus.length <= 0 ? "Genus must not be empty" : null,
          family: values.family.length <= 0 ? "Family must not be empty" : null,
        };
      }

      if (wizardIndex === 2) {
        return {
          bloomTime:
            values.bloomTime.length <= 0
              ? "Bloom Time must not be empty"
              : null,
        };
      }

      if (wizardIndex === 3) {
        return {
          sunlight:
            values.sunlight.length <= 0
              ? "Sunlight Time must not be empty"
              : null,
          watering:
            values.watering.length <= 0
              ? "Watering Time must not be empty"
              : null,
          soilType:
            values.soilType.length <= 0
              ? "Soil Type Time must not be empty"
              : null,
        };
      }

      return {};
    },
  });

  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);
  const isEdit = plant != undefined && plant != undefined;
  const formValues = form.getValues();

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
    const plantSaved = await savePlant(composePlantPayload(values, avatarId));

    setIsSubmitting(false);

    if (plantSaved) {
      router.push("/");
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

  const composePlantPayload = (
    values: FormValues,
    avatarId: number | null,
  ): PlantOnCreate | PlantOnUpdate => {
    const { avatar, birthday, ...payload } = values;

    return {
      id: plant?.id ?? 0,
      avatarId: avatarId ?? 0,
      birthday: dayjs(values.birthday).format("YYYY-MM-DDTHH:mm:ssZ"),
      ...payload,
    };
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

  const nextStep = () =>
    setWizardIndex((current) => {
      if (form.validate().hasErrors) {
        return current;
      }

      return current < WIZARD_STEPS ? current + 1 : current;
    });

  const prevStep = () =>
    setWizardIndex((current) => (current > 0 ? current - 1 : current));

  const setWizardIndexWithValidation = (index: number) => {
    if (!form.validate().hasErrors) {
      setWizardIndex(index);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isSubmitting}
        overlayProps={{ blur: 2 }}
        loaderProps={{ size: "lg" }}
      />

      <form
        onSubmit={(e) => {
          const handler = form.onSubmit(handleSubmit, handleError);

          e.preventDefault();
          setIsSubmitting(true);
          handler();
        }}
      >
        <Stepper
          size="md"
          orientation={isMobile ? "vertical" : "horizontal"}
          active={wizardIndex}
          onStepClick={setWizardIndexWithValidation}
        >
          <Stepper.Step
            label="Step 1"
            description="General"
            icon={<IconArticle />}
          >
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <TextInput
                  data-autofocus
                  withAsterisk
                  label="Pid"
                  placeholder="Input Plant ID"
                  key={form.key("pid")}
                  {...form.getInputProps("pid")}
                />

                <TextInput
                  withAsterisk
                  mt="md"
                  label="Scientific Name"
                  placeholder="Input Plant Scientific Name"
                  key={form.key("scientificName")}
                  {...form.getInputProps("scientificName")}
                />

                <DateInput
                  withAsterisk
                  mt="md"
                  label="Birthday"
                  placeholder="Input Plant Birthday"
                  maxDate={new Date()}
                  valueFormat="DD/MM/YYYY"
                  key={form.key("birthday")}
                  {...form.getInputProps("birthday")}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 6, md: 4, lg: 2 }}>
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
            </Grid>
          </Stepper.Step>

          <Stepper.Step
            label="Step 2"
            description="Family"
            icon={<IconHierarchy />}
          >
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <Select
                  withAsterisk
                  mt="md"
                  label="Type"
                  placeholder="Pick Plant Type"
                  data={[
                    "Annual",
                    "Broadleaf evergreen",
                    "Bulb",
                    "Deciduous shrub",
                    "Epiphyte",
                    "Fern",
                    "Fruit",
                    "Herbaceous perennial",
                    "Needled evergreen",
                    "Orchid",
                    "Ornamental grass",
                    "Palm or Cycad",
                    "Rush or Sedge",
                    "Tree",
                    "Turfgrass",
                    "Vine",
                  ]}
                  key={form.key("type")}
                  {...form.getInputProps("type")}
                />

                <TextInput
                  withAsterisk
                  mt="md"
                  label="Genus"
                  placeholder="Input Plant Genus"
                  key={form.key("genus")}
                  {...form.getInputProps("genus")}
                />

                <TextInput
                  withAsterisk
                  mt="md"
                  label="Family"
                  placeholder="Insert Plant Family"
                  key={form.key("name")}
                  {...form.getInputProps("family")}
                />
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Step
            label="Step 3"
            description="Bloom"
            icon={<IconGrowth />}
          >
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <TextInput
                  withAsterisk
                  label="Bloom Time"
                  placeholder="Input plant Bloom Time"
                  key={form.key("bloomTime")}
                  {...form.getInputProps("bloomTime")}
                />

                <Textarea
                  mt="md"
                  label="Bloom Description"
                  placeholder="Input Plant Bloom Description"
                  key={form.key("bloomDescription")}
                  {...form.getInputProps("bloomDescription")}
                />
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Step
            label="Step 4"
            description="Care"
            icon={<IconClipboardHeart />}
          >
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <Select
                  withAsterisk
                  label="Sunlight"
                  placeholder="Pick Plant Sunlight"
                  data={[
                    "Full sun",
                    "Full sun to part shade",
                    "Part shade",
                    "Part shade to full shade",
                    "Full Shade",
                  ]}
                  key={form.key("sunlight")}
                  {...form.getInputProps("sunlight")}
                />

                <Select
                  withAsterisk
                  mt="md"
                  label="Watering"
                  placeholder="Pick Plant Watering"
                  data={[
                    "Dry",
                    "Dry to medium",
                    "Medium",
                    "Medium to wet",
                    "Wet",
                  ]}
                  key={form.key("watering")}
                  {...form.getInputProps("watering")}
                />

                <TextInput
                  withAsterisk
                  mt="md"
                  label="Soil Type"
                  placeholder="Input Plant Soil Type"
                  key={form.key("soilType")}
                  {...form.getInputProps("soilType")}
                />
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Step
            label="Step 5"
            description="Additional"
            icon={<IconSettings />}
          >
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <MultiSelect
                  clearable
                  mt="md"
                  label="Flowers"
                  placeholder="Pick Plant Flowers"
                  data={[
                    "Showy",
                    "Fragrant",
                    "Insignificant",
                    "Good Cut",
                    "Good Dried",
                  ]}
                  key={form.key("flowers")}
                  {...form.getInputProps("flowers")}
                />

                <Select
                  clearable
                  mt="md"
                  label="Fruit"
                  placeholder="Pick Plant Fruit"
                  data={["Showy", "Edible"]}
                  key={form.key("fruit")}
                  {...form.getInputProps("fruit")}
                />

                <MultiSelect
                  clearable
                  mt="md"
                  label="Leaves"
                  placeholder="Pick Leaves"
                  data={["Colorful", "Fragrant", "Good Fall", "Evergreen"]}
                  key={form.key("leaves")}
                  {...form.getInputProps("leaves")}
                />

                <Textarea
                  mt="md"
                  label="Notes"
                  placeholder="Input Plant Notes"
                  key={form.key("notes")}
                  {...form.getInputProps("notes")}
                />
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Completed>
            <Text size="xl" mt="xs" mb="md" fw={700}>
              Review information:
            </Text>

            {formValues.avatar && (
              <Card w={200} mb="sm">
                <Card.Section>
                  <Image
                    src={URL.createObjectURL(formValues.avatar)}
                    alt="image preview"
                  />
                </Card.Section>
                <Text fw={500} size="lg" mt="md" truncate>
                  {formValues.avatar.name}
                </Text>
                <Text mt="xs" c="dimmed" size="sm">
                  {(formValues.avatar.size / 1024).toFixed(2)} KiB
                </Text>
              </Card>
            )}

            <Text>
              Pid: <strong>{formValues.pid}</strong>
            </Text>
            <Text>
              Scientific Name: <strong>{formValues.scientificName}</strong>
            </Text>
            <Text>
              Birthday:{" "}
              <strong>{dayjs(formValues.birthday).format("DD/MM/YYYY")}</strong>
            </Text>

            <Space h="xs" />

            <Text>
              Type: <strong>{formValues.type}</strong>
            </Text>
            <Text>
              Genus: <strong>{formValues.genus}</strong>
            </Text>
            <Text>
              Family: <strong>{formValues.family}</strong>
            </Text>

            <Space h="xs" />

            <Text>
              Bloom Time: <strong>{formValues.bloomTime}</strong>
            </Text>
            {formValues.bloomDescription && (
              <Text>
                Bloom Description:{" "}
                <strong>{formValues.bloomDescription}</strong>
              </Text>
            )}

            <Space h="xs" />

            <Text>
              Sunlight: <strong>{formValues.sunlight}</strong>
            </Text>
            <Text>
              Watering: <strong>{formValues.watering}</strong>
            </Text>
            <Text>
              Soil Type: <strong>{formValues.soilType}</strong>
            </Text>

            <Space h="xs" />

            {formValues.flowers && (
              <Text>
                Flowers: <strong>{formValues.flowers.join(", ")}</strong>
              </Text>
            )}
            {formValues.fruit && (
              <Text>
                Fruit: <strong>{formValues.fruit}</strong>
              </Text>
            )}
            {formValues.leaves && (
              <Text>
                Leaves: <strong>{formValues.leaves.join(", ")}</strong>
              </Text>
            )}
            {formValues.notes && (
              <Text>
                Notes: <strong>{formValues.notes}</strong>
              </Text>
            )}
          </Stepper.Completed>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {wizardIndex !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}

          {wizardIndex !== WIZARD_STEPS && (
            <Button variant="outline" onClick={nextStep}>
              Next step
            </Button>
          )}

          {wizardIndex === WIZARD_STEPS && (
            <Button type="submit" loading={isSubmitting}>
              Submit
            </Button>
          )}
        </Group>
      </form>
    </Box>
  );
}
