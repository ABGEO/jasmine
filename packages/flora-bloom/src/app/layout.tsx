import { ReactNode } from "react";

import type { Metadata } from "next";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { AuthGuard } from "@/components/AuthGuard";
import { SessionWrapper } from "@/components/SessionWrapper";

import { theme } from "@/theme";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";

import { DatesProvider } from "@mantine/dates";

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
          <Notifications position="top-right" autoClose={5000} />

          <ModalsProvider>
            <DatesProvider settings={{ timezone: "Asia/Tbilisi" }}>
              <SessionWrapper>
                <AuthGuard>{children}</AuthGuard>
              </SessionWrapper>
            </DatesProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
