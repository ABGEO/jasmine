import axios, { CustomAxiosInstance } from "axios";

import { getSession } from "next-auth/react";

import { produceAccessTokenInterceptor } from "@/lib/http/client/interceptors";

const FloraBridgeClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FLORA_BRIDGE_URL,
}) as CustomAxiosInstance;

let IS_REFRESHING = false;

FloraBridgeClient.reloadAuth = async () => {
  if (!IS_REFRESHING) {
    IS_REFRESHING = true;
    const session = await getSession();
    if (session && !session.error) {
      FloraBridgeClient.interceptors.request.handlers = [];
      FloraBridgeClient.interceptors.request.use(
        produceAccessTokenInterceptor(session.idToken),
      );

      IS_REFRESHING = false;
      return;
    }

    IS_REFRESHING = false;
    throw new Error();
  }
};

export { FloraBridgeClient };
