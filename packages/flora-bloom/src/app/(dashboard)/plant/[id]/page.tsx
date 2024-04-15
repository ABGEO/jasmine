"use client";

import useSWR from "swr";

import { useParams } from "next/navigation";

import { Grid } from "@mantine/core";

import { GrafanaPanel } from "@/components/GrafanaPanel";
import { PageContainer } from "@/components/PageContainer";

import { PlantRepository } from "@/lib/repositories/plant";

export default function Plant() {
  const params = useParams();
  const { data } = useSWR(["/plant", params.id], ([_, id]) =>
    PlantRepository.getSingle(Number(id)),
  );

  const refresh = 5;

  return (
    <PageContainer
      title="Plant Details"
      items={[
        { label: "Plants", href: "/" },
        { label: data?.pid ?? "", href: "" },
      ]}
    >
      <Grid>
        <Grid.Col span={{ base: 2 }}>
          <GrafanaPanel pid={data?.pid ?? ""} refresh={refresh} panelID={17} />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel pid={data?.pid ?? ""} refresh={refresh} panelID={6} />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel pid={data?.pid ?? ""} refresh={refresh} panelID={9} />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel pid={data?.pid ?? ""} refresh={refresh} panelID={1} />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel pid={data?.pid ?? ""} refresh={refresh} panelID={24} />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel pid={data?.pid ?? ""} refresh={refresh} panelID={16} />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <GrafanaPanel pid={data?.pid ?? ""} refresh={refresh} panelID={28} />
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
}
