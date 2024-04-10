'use client';

import { useSession } from "next-auth/react";

import styled from '@emotion/styled'

interface GrafanaPanelProps {
  pid: string,
  refresh: Number,
  panelID: Number,
}

function GrafanaPanel({ pid, refresh, panelID }: GrafanaPanelProps) {
  const { data: session } = useSession();

  const theme = "light";
  
  const panelURL = `${process.env.NEXT_PUBLIC_GRAFANA_URL}/d-solo/monitoring/monitoring?refresh=${refresh}s&theme=${theme}&panelId=${panelID}&var-pid=${pid}&auth_token=${session?.idToken}`

  const Iframe = styled('iframe')({
    border: 0,
  });

  return <Iframe src={panelURL} height="200" />
}

export default GrafanaPanel;
