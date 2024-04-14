import {
  Group,
  MantineColorScheme,
  Radio,
  useMantineColorScheme,
} from "@mantine/core";

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Radio.Group
      value={colorScheme}
      onChange={(value) => {
        setColorScheme(value as MantineColorScheme);
      }}
      name="theme"
      label="Theme Mode"
    >
      <Group mt="sm">
        <Radio value="light" label="Light" />
        <Radio value="dark" label="Dark" />
      </Group>
    </Radio.Group>
  );
}
