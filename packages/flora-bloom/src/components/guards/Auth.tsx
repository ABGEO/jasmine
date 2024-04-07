'use client';

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

import PageLoader from "@/components/PageLoader";

interface AuthGuardProps {
  children: ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState<boolean>(true);

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }

    if (status === "authenticated") {
      setLoading(false);
    }
  }, [router, status]);

  if (loading) {
    return <PageLoader size={128} sx={{ width: "100%", height: "100vh" }} />;
  }

  return children;
}

export default AuthGuard;
