import Image from "next/image";
import Link from "next/link";

import { ActionIcon, Button, Card, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

import { IconEdit, IconTrash } from "@tabler/icons-react";

import { PlantOnCreateResponse } from "@/types/dtos/plant";

import classes from "./PlantCard.module.css";

interface PlantCardProps {
  plant: PlantOnCreateResponse;
}

export function PlantCard({ plant }: PlantCardProps) {
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
      onCancel: () => console.log(`Cancel: ${plant.id}`),
      onConfirm: () => console.log(`Delete: ${plant.id}`),
    });

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src={`https://placehold.co/1920x1080/png?text=${plant.pid}`}
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
            {plant.pid}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          description
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          plant details
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button
          component={Link}
          href={`/plant/${plant.pid}`}
          radius="md"
          style={{ flex: 1 }}
        >
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
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
  );
}
