type PlantOnCreate = {
  pid: string;
};

type PlantOnCreateResponse = {
  id: number;
  pid: string;
  createdAt: string;
  updatedAt: string;
};

export type { PlantOnCreate, PlantOnCreateResponse };
