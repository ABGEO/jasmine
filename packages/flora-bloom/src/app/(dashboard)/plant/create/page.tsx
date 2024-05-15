import { Paper } from "@mantine/core";

import { PageContainer } from "@/components/PageContainer";
import { PlantForm } from "@/components/PlantForm";

export default function CreatePlant() {
  return (
    <PageContainer
      title="Create Plant"
      items={[
        { label: "Plants", href: "/" },
        { label: "Create" ?? "", href: "" },
      ]}
    >
      <Paper shadow="xs" p="xl">
        <PlantForm />
      </Paper>
    </PageContainer>
  );
}
