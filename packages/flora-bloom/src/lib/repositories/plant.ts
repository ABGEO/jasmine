import { AxiosInstance } from "axios";

import { FloraBridgeClient } from "@/lib/http/client/flora-bridge";
import {
  PlantOnCreate,
  PlantOnResponse,
  PlantOnUpdate,
} from "@/types/dtos/plant";

const routePreffix = "/plant";

interface IPlantRepository {
  create: (payload: PlantOnCreate) => Promise<PlantOnResponse>;
  getAll: () => Promise<PlantOnResponse[]>;
  getSingle: (id: number) => Promise<PlantOnResponse>;
  update: (payload: PlantOnUpdate) => Promise<PlantOnResponse>;
  delete: (id: number) => Promise<object>;
}

function UseRepositoryFactory(http: AxiosInstance): IPlantRepository {
  return {
    create: async (payload: PlantOnCreate) => {
      const response = await http.post(`${routePreffix}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    getAll: async () => {
      const response = await http.get(`${routePreffix}`);
      return response.data;
    },
    getSingle: async (id: number) => {
      const response = await http.get(`${routePreffix}/${id}`);
      return response.data;
    },
    update: async (payload: PlantOnUpdate) => {
      const response = await http.patch(`${routePreffix}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    delete: async (id: number) => {
      const response = await http.delete(`${routePreffix}/${id}`);
      return response.data;
    },
  };
}

const PlantRepository = UseRepositoryFactory(FloraBridgeClient);

export { UseRepositoryFactory, PlantRepository };
