import { Box, Button, Grid } from "@mui/material";

export default function Toggles({ setCurrentTeam }) {
  const handleClick = (event) => {
    setCurrentTeam(event.currentTarget.id);
  };
  return (
    <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { md: "column " },
          width: "100%",
          gap: 4,
          minHeight: { xs: "60px", sm: "80px", md: "120px" },
        }}
      >
        <Button onClick={handleClick} id="varsity" size="Large">
          Varsity
        </Button>
        <Button onClick={handleClick} id="jv" size="Large">
          Jv
        </Button>
        <Button onClick={handleClick} id="freshman" size="Large">
          Freshman
        </Button>
      </Box>
    </Grid>
  );
}
