import { AxiosInstance } from "axios";

import { FloraBridgeClient } from "@/lib/http/client/flora-bridge";
import { PlantOnCreate, PlantOnCreateResponse } from "@/types/dtos/plant";

const routePreffix = "/plant";

interface IPlantRepository {
  create: (payload: PlantOnCreate) => Promise<PlantOnCreateResponse>;
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
  };
}

const PlantRepository = UseRepositoryFactory(FloraBridgeClient);

export { UseRepositoryFactory, PlantRepository };
