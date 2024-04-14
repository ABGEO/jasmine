"use client";

import { Grid } from "@mantine/core";

import { PageContainer } from "@/components/PageContainer";
import { PlantCard } from "@/components/PlantCard";

import { PlantOnCreateResponse } from "@/types/dtos/plant";

export default function Dashboard() {
  const plants: PlantOnCreateResponse[] = [
    {
      id: 1,
      pid: "jasmine",
      createdAt: "",
      updatedAt: "",
    },
  ];

  return (
    <PageContainer title="Plants">
      <Grid pb="lg">
        {plants.map((plant) => (
          <Grid.Col key={plant.id} span={{ base: 12, md: 6, lg: 3 }}>
            <PlantCard plant={plant} />
          </Grid.Col>
        ))}
      </Grid>
    </PageContainer>
  );
}
