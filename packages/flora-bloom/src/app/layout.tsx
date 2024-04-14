import { ReactNode } from "react";

import type { Metadata } from "next";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { AuthGuard } from "@/components/AuthGuard";
import { SessionWrapper } from "@/components/SessionWrapper";

import { theme } from "@/theme";

import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "Jasmine Dashboard",
  description: "Jasmine Dashboard",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <SessionWrapper>
            <AuthGuard>{children}</AuthGuard>
          </SessionWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
