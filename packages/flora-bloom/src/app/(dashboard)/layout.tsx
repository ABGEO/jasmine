"use client";

import { ReactNode } from "react";

import {
  AppShell,
  Burger,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const bg =
    colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <AppShell.Header>
        <Header
          burger={
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              mr="xl"
            />
          }
        />
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main bg={bg} pb="60">
        {children}
      </AppShell.Main>

      <AppShell.Footer p="sm">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
