import { ReactNode } from "react";

import Link from "next/link";

import { Box, Flex } from "@mantine/core";

import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

import classes from "./Header.module.css";

interface Props {
  burger?: ReactNode;
}

export function Header({ burger }: Props) {
  return (
    <header className={classes.header}>
      {burger && burger}
      <Flex direction="row" align="center" gap={4}>
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          className={classes.heading}
        >
          <Logo size={40} />
        </Link>
      </Flex>

      <Box style={{ flex: 1 }} />

      <ThemeSwitcher />
    </header>
  );
}
