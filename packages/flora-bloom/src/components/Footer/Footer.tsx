import { ActionIcon, Group, rem, Text } from "@mantine/core";

import { IconBrandGithub } from "@tabler/icons-react";

import classes from "./Footer.module.css";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Text c="dimmed" size="sm" m="auto">
        © 2024 Jasmine Flora Bloom. All rights reserved.
      </Text>

      <Group gap="xs" justify="flex-end" wrap="nowrap">
        <ActionIcon size="lg" variant="default" radius="xl">
          <IconBrandGithub
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
      </Group>
    </div>
  );
}
