"use client";

import { useParams } from "next/navigation";

import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import GrafanaPanel from "@/components/grafana/Panel";

export default function Plant() {
  const params = useParams();

  const refresh = 5;

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Plants {'>'} {params.id}
        </Typography>

        <GrafanaPanel pid={params.id as string} refresh={refresh} panelID={6} />
        <GrafanaPanel pid={params.id as string} refresh={refresh} panelID={9} />
        <GrafanaPanel pid={params.id as string} refresh={refresh} panelID={1} />
        <GrafanaPanel pid={params.id as string} refresh={refresh} panelID={24} />
        <GrafanaPanel pid={params.id as string} refresh={refresh} panelID={16} />
        <GrafanaPanel pid={params.id as string} refresh={refresh} panelID={28} />
      </Paper>
    </Grid>
  )
}
