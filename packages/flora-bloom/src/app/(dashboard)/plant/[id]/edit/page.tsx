"use client";

import useSWR from "swr";

import { useParams } from "next/navigation";

import { Paper } from "@mantine/core";

import { PageContainer } from "@/components/PageContainer";
import { PageLoader } from "@/components/PageLoader";
import { PlantForm } from "@/components/PlantForm";

import { PlantRepository } from "@/lib/repositories/plant";

export default function EditPlant() {
  const params = useParams();
  const { data } = useSWR(["/plant", params.id], ([_, id]) =>
    PlantRepository.getSingle(Number(id)),
  );

  if (!data) {
    return <PageLoader size={128} />;
  }

  return (
    <PageContainer
      title="Edit Plant"
      items={[
        { label: "Plants", href: "/" },
        { label: data?.pid ?? "", href: `/plant/${data?.id}` },
        { label: "Edit" ?? "", href: "" },
      ]}
    >
      <Paper shadow="xs" p="xl">
        <PlantForm plant={data} />
      </Paper>
    </PageContainer>
  );
}
