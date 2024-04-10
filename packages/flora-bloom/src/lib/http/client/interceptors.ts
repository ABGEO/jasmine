import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { FloraBridgeClient } from "@/lib/http/client/flora-bridge";

function produceAccessTokenInterceptor(
  token: string,
): (req: InternalAxiosRequestConfig) => InternalAxiosRequestConfig {
  return (req: InternalAxiosRequestConfig) => {
    if (req && req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  };
}

function produceLogoutInterceptor(
  cb: () => Promise<unknown>,
): (error: AxiosError) => void {
  return async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        await FloraBridgeClient.reloadAuth();
      } catch {
        console.error("Unable to perform auth reload.");
        await cb();
      }
    }

    return Promise.reject(error);
  };
}

export { produceAccessTokenInterceptor, produceLogoutInterceptor };
