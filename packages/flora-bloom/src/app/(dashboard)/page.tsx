"use client";

import useSWR from "swr";

import { Grid, Group, Paper, Skeleton, Text } from "@mantine/core";

import { PageContainer } from "@/components/PageContainer";
import { PlantCard } from "@/components/PlantCard";

import { PlantRepository } from "@/lib/repositories/plant";

function CardSkeleton() {
  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
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

  return (
    <PageContainer title="Plants">
      <Grid pb="lg">
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, __) => CardSkeleton())}

        {!isLoading && (!data || data.length === 0) && (
          <Paper shadow="xs" p="xl" w="100%">
            <Text ta="center">
              Looks like there&apos;s no flora in this space. Why not{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                plant
              </a>{" "}
              something new?
            </Text>
          </Paper>
        )}

        {!isLoading &&
          data &&
          data.map((plant) => (
            <Grid.Col key={plant.id} span={{ base: 12, md: 6, lg: 3 }}>
              <PlantCard plant={plant} />
            </Grid.Col>
          ))}
      </Grid>
    </PageContainer>
  );
}
