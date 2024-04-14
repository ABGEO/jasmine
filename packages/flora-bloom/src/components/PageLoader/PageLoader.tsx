import NProgress from "nprogress";
import { useEffect } from "react";

import { Center, Loader } from "@mantine/core";

interface PageLoaderProps {
  size: number;
}

export function PageLoader({ size }: PageLoaderProps) {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Center style={{ width: "100%", height: "100vh" }}>
      <Loader size={size} />
    </Center>
  );
}
