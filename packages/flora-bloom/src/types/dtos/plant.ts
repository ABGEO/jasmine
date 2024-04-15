import Plant from "@/app/(dashboard)/plant/[id]/page";

type Plant = {
  pid: string;
};

type PlantOnCreate = Plant;

type PlantOnUpdate = Plant & {
  id: number;
};

type PlantOnResponse = Plant & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type { Plant, PlantOnCreate, PlantOnUpdate, PlantOnResponse };
