import { AxiosInstance } from "axios";

import { FloraBridgeClient } from "@/lib/http/client/flora-bridge";
import { FileOnResponse } from "@/types/dtos/file";

const routePreffix = "/file";

enum Destination {
  Avatar = "avatar",
}

interface IFileRepository {
  upload: (file: Blob, destination?: Destination) => Promise<FileOnResponse>;
}

function UseRepositoryFactory(http: AxiosInstance): IFileRepository {
  return {
    upload: async (file: Blob, destination?: Destination) => {
      if (file.type === "image/heic") {
        file = file.slice(0, file.size, "image/heic");
      }

      const data = new FormData();
      data.append("file", file);

      let url = `${routePreffix}/upload`;

      if (destination) {
        url += `?destination=${destination}`;
      }

      const response = await http.post(url, data);
      return response.data;
    },
  };
}

const FileRepository = UseRepositoryFactory(FloraBridgeClient);

export { UseRepositoryFactory, FileRepository, Destination };
