"use client";

import axios from "axios";
import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { ActionIcon, Box, Drawer, Flex, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconSettings } from "@tabler/icons-react";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";

import classes from "./Header.module.css";

interface Props {
  burger?: ReactNode;
}

export function Header({ burger }: Props) {
  const [settingsOpened, { close: settingsClose, open: settingsOpen }] =
    useDisclosure(false);

  axios.AxiosError;

  return (
    <header className={classes.header}>
      {burger && burger}
      <Flex direction="row" align="center" gap={4}>
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          className={classes.heading}
        >
          <Image
            src="/assets/logo.svg"
            height={35}
            width={123}
            alt="Jasmine Flora Bloom Logo"
          />
        </Link>
      </Flex>

      <Box style={{ flex: 1 }} />

      <ActionIcon onClick={settingsOpen} variant="subtle">
        <IconSettings size="1.25rem" />
      </ActionIcon>

      <Drawer
        opened={settingsOpened}
        onClose={settingsClose}
        title="Settings"
        position="right"
        transitionProps={{ duration: 0 }}
      >
        <Stack gap="lg">
          <ThemeSwitcher />
        </Stack>
      </Drawer>
    </header>
  );
}
