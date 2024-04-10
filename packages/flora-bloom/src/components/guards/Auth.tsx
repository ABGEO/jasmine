'use client';

import { ReactNode, useEffect, useState, useRef, useCallback } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { AxiosRequestConfig } from "axios";

import PageLoader from "@/components/PageLoader";
import { FloraBridgeClient } from "@/lib/http/client/flora-bridge";
import { produceAccessTokenInterceptor, produceLogoutInterceptor } from "@/lib/http/client/interceptors";

interface AuthGuardProps {
  children: ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const [interceptor, setInterceptor] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const floraBridgeRequestInterceptorRef = useRef<number>(0);
  const floraBridgeResponseInterceptorRef = useRef<number>(0);

  const { data: session, status } = useSession();
  const logOutCallback = useCallback(async () => {
    await signOut({ redirect: false });
  }, []);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" || status === "unauthenticated") {
      signIn();
    }

    if (status === "authenticated") {
      floraBridgeRequestInterceptorRef.current =
        FloraBridgeClient.interceptors.request.use(
          produceAccessTokenInterceptor(session.idToken),
        );

      setInterceptor(true);
      setLoading(false);
    }

    return () => {
      FloraBridgeClient.interceptors.request.eject(
        floraBridgeRequestInterceptorRef.current,
      );
    };
  }, [session, status]);

  useEffect(() => {
    if (interceptor) {
      floraBridgeResponseInterceptorRef.current =
        FloraBridgeClient.interceptors.response.use(
          (req: AxiosRequestConfig) => req,
          produceLogoutInterceptor(logOutCallback),
        );
    }

    return () => {
      FloraBridgeClient.interceptors.response.eject(
        floraBridgeResponseInterceptorRef.current,
      );
    };
  }, [interceptor, logOutCallback]);

  if (loading) {
    return <PageLoader size={128} sx={{ width: "100%", height: "100vh" }} />;
  }

  return children;
}

export default AuthGuard;
