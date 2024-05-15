import dayjs from "dayjs";

import Image from "next/image";
import Link from "next/link";

import { ActionIcon, Button, Card, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import {
  IconCheck,
  IconEdit,
  IconExclamationMark,
  IconTrash,
} from "@tabler/icons-react";

import { PlantRepository } from "@/lib/repositories/plant";
import { PlantOnResponse } from "@/types/dtos/plant";

import classes from "./PlantCard.module.css";

interface PlantCardProps {
  plant: PlantOnResponse;
  onDelete?: () => void;
}

export function PlantCard({ plant, onDelete }: PlantCardProps) {
  const deleteWebsite = () => {
    PlantRepository.delete(plant.id)
      .then(() => {
        notifications.show({
          color: "green",
          icon: <IconCheck />,
          title: "Success!",
          message: "Your plant has been deleted successfully.",
        });

        if (onDelete) {
          onDelete();
        }
      })
      .catch((reason) => {
        notifications.show({
          color: "red",
          icon: <IconExclamationMark />,
          title: "Oops!",
          message: `Something went wrong and we couldn't delete the plant. Please try again later. ${reason.response.data.error}`,
        });
      });
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete Plant",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to remove plant &quot;{plant.pid}&quot; from the
          garden? Once deleted, it cannot be recovered.
        </Text>
      ),
      labels: { confirm: "Delete Plant", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: deleteWebsite,
    });

  const calculatePlantAge = () => {
    const birthDate = dayjs(plant.birthday);
    const currentDate = dayjs();

    const ageInYears = currentDate.diff(birthDate, "year");
    const adjustedBirthDate = birthDate.add(ageInYears, "year");
    const ageInMonths = currentDate.diff(adjustedBirthDate, "month");
    const adjustedBirthDateWithMonths = adjustedBirthDate.add(
      ageInMonths,
      "month",
    );
    const ageInDays = currentDate.diff(adjustedBirthDateWithMonths, "day");

    const items = [];
    if (ageInYears !== 0) {
      items.push(`${ageInYears} ${ageInYears === 1 ? "year" : "years"}`);
    }

    if (ageInMonths !== 0) {
      items.push(`${ageInMonths} ${ageInMonths === 1 ? "month" : "months"}`);
    }

    if (ageInDays !== 0) {
      items.push(`${ageInDays} ${ageInDays === 1 ? "day" : "days"}`);
    }

    return `${items.join(", ")} (${birthDate.format("DD/MM/YYYY")})`;
  };

  return (
    <>
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image
            src={
              plant.avatar.key == ""
                ? "/assets/no-image.png"
                : `${process.env.NEXT_PUBLIC_S3_URL}/${plant.avatar.key}`
            }
            alt={plant.pid}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              {plant.pid} ({plant.scientificName})
            </Text>
          </Group>
          <Text fz="sm" mt="xs">
            {plant.genus}, {plant.family}
          </Text>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="md" c="dimmed">
            Age: <strong>{calculatePlantAge()}</strong>
          </Text>
          <Text c="dimmed">
            Type: <strong>{plant.type}</strong>
          </Text>
        </Card.Section>

        <Group mt="xs">
          <Button
            component={Link}
            href={`/plant/${plant.id}`}
            radius="md"
            style={{ flex: 1 }}
          >
            Show details
          </Button>
          <ActionIcon
            component={Link}
            href={`/plant/${plant.id}/edit`}
            variant="default"
            radius="md"
            size={36}
          >
            <IconEdit className={classes.edit} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            radius="md"
            size={36}
            onClick={openDeleteModal}
          >
            <IconTrash className={classes.delete} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card>
    </>
  );
}
