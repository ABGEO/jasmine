"use client";

import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Plants
        </Typography>
      </Paper>
    </Grid>
  )
}
