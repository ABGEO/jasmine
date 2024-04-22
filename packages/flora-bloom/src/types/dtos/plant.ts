import { FileOnResponse } from "./file";

type Plant = {
  pid: string;
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
