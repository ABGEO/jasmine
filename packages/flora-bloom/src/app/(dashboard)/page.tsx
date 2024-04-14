"use client";

import useSWR, { mutate } from "swr";

import { Button, Grid, Group, Paper, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconPlus } from "@tabler/icons-react";

import { PageContainer } from "@/components/PageContainer";
import { PlantCard } from "@/components/PlantCard";
import { PlantFormModal } from "@/components/PlantFormModal";

import { PlantRepository } from "@/lib/repositories/plant";

function CardSkeleton(key: number) {
  return (
    <Grid.Col key={key} span={{ base: 12, md: 6, lg: 3 }}>
      <Skeleton height={100} mb="xl" />

      <Skeleton height={20} width="30%" radius="xl" />
      <Skeleton height={8} mt={20} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />

      <Group mt="md">
        <Skeleton height={30} width="70%" radius="xl" />
        <Skeleton height={30} width="10%" radius="xl" />
        <Skeleton height={30} width="10%" radius="xl" />
      </Group>
    </Grid.Col>
  );
}

export default function Dashboard() {
  const { data, isLoading } = useSWR("/plant", PlantRepository.getAll);
  const [
    createModalOpened,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure(false);

  return (
    <PageContainer title="Plants">
      <PlantFormModal
        open={createModalOpened}
        onClose={() => {
          closeCreateModal();
          void mutate("/plant");
        }}
      />

      <Grid pb="lg">
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, index) => CardSkeleton(index))}

        {!isLoading && (!data || data.length === 0) && (
          <Paper shadow="xs" p="xl" w="100%">
            <Text ta="center">
              Looks like there&apos;s no flora in this space. Why not{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openCreateModal();
                }}
              >
                plant
              </a>{" "}
              something new?
            </Text>
          </Paper>
        )}

        {!isLoading && data && data.length > 0 && (
          <>
            <Grid.Col span={{ base: 12 }}>
              <Button
                leftSection={<IconPlus size={16} />}
                variant="filled"
                onClick={openCreateModal}
              >
                Add Plant
              </Button>
            </Grid.Col>

            {data.map((plant) => (
              <Grid.Col key={plant.id} span={{ base: 12, md: 6, lg: 3 }}>
                <PlantCard plant={plant} />
              </Grid.Col>
            ))}
          </>
        )}
      </Grid>
    </PageContainer>
  );
}
