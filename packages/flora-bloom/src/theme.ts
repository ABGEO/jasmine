"use client";

import { colorsTuple, createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "jasmine",
  colors: {
    jasmine: colorsTuple([
      "#e9fcf1",
      "#d8f4e5",
      "#b5e6cb",
      "#8cd8af",
      "#6bcb96",
      "#56c586",
      "#49c17e",
      "#39aa6b",
      "#2e975e",
      "#1d834e",
    ]),
  },
});

export { theme };
