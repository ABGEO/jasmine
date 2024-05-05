import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

import { IconMoon, IconSun } from "@tabler/icons-react";

import classes from "./ThemeSwitcher.module.css";

export function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="subtle"
      aria-label="Toggle color scheme"
    >
      <IconSun className={classes.light} size="1.25rem" />
      <IconMoon className={classes.dark} size="1.25rem" />
    </ActionIcon>
  );
}
