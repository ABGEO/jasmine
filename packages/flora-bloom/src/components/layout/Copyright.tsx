import { Typography, Link } from "@mui/material";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.primary"
      align="center"
      sx={{ pt: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/ABGEO/jasmine">
        Jasmine
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
