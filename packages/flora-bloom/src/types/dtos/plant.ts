import Plant from "@/app/(dashboard)/plant/[id]/page";

type Plant = {
  pid: string;
};

type PlantOnCreate = Plant;

type PlantOnResponse = Plant & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

type PlantOnCreateResponse = PlantOnResponse;

export type { Plant, PlantOnCreate, PlantOnResponse, PlantOnCreateResponse };
