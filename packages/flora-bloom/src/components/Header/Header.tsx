"use client";

import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { Box, Flex } from "@mantine/core";

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
          <Image
            src="/assets/logo.svg"
            height={35}
            width={123}
            alt="Jasmine Flora Bloom Logo"
          />
        </Link>
      </Flex>

      <Box style={{ flex: 1 }} />

      <ThemeSwitcher />
    </header>
  );
}
