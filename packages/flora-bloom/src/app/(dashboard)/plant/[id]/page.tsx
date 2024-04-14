"use client";

import { useParams } from "next/navigation";

import { Grid } from "@mantine/core";

import { GrafanaPanel } from "@/components/GrafanaPanel";
import { PageContainer } from "@/components/PageContainer";

export default function Plant() {
  const params = useParams();

  const refresh = 5;

  return (
    <PageContainer
      title="Plant Details"
      items={[
        { label: "Plants", href: "/" },
        { label: params.id as string, href: "" },
      ]}
    >
      <Grid>
        <Grid.Col span={{ base: 2 }}>
          <GrafanaPanel
            pid={params.id as string}
            refresh={refresh}
            panelID={17}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel
            pid={params.id as string}
            refresh={refresh}
            panelID={6}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel
            pid={params.id as string}
            refresh={refresh}
            panelID={9}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel
            pid={params.id as string}
            refresh={refresh}
            panelID={1}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel
            pid={params.id as string}
            refresh={refresh}
            panelID={24}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel
            pid={params.id as string}
            refresh={refresh}
            panelID={16}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel
            pid={params.id as string}
            refresh={refresh}
            panelID={28}
          />
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
}
