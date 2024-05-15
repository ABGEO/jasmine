import { FileOnResponse } from "./file";

type Plant = {
  pid: string;
  birthday: string;
  scientificName: string;
  type: string;
  genus: string;
  family: string;
  bloomTime: string;
  bloomDescription: string;
  sunlight: string;
  watering: string;
  soilType: string;
  flowers: string[];
  fruit: string;
  leaves: string[];
  notes: string;
};

type PlantOnCreate = Plant & {
  avatarId?: number;
};

type PlantOnUpdate = Plant & {
  id: number;
  avatarId?: number;
};

type PlantOnResponse = Plant & {
  id: number;
  createdAt: string;
  updatedAt: string;
  avatar: FileOnResponse;
};

export type { Plant, PlantOnCreate, PlantOnUpdate, PlantOnResponse };
