import { useSession } from "next-auth/react";

import { useMantineColorScheme } from "@mantine/core";

import classes from "./GrafanaPanel.module.css";

interface GrafanaPanelProps {
  pid: string;
  refresh: number;
  panelID: number;
}

export function GrafanaPanel({ pid, refresh, panelID }: GrafanaPanelProps) {
  const { data: session } = useSession();
  const { colorScheme } = useMantineColorScheme();

  const panelURL = `${process.env.NEXT_PUBLIC_GRAFANA_URL}/d-solo/monitoring/monitoring?refresh=${refresh}s&theme=${colorScheme}&panelId=${panelID}&var-pid=${pid}&auth_token=${session?.idToken}`;

  return (
    <iframe
      className={classes.frame}
      src={panelURL}
      height="200"
      width="100%"
    />
  );
}
