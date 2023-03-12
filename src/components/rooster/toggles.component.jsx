import { Box, Button, Grid } from "@mui/material";

export default function Toggles({ setCurrentTeam }) {
  const handleClick = (event) => {
    setCurrentTeam(event.currentTarget.id);
  };
  return (
    <Grid item xs={12}>
      <Box sx={{ height: "100%", display: "flex", justifyContent: "center", columnGap: 4 }}>
        <Button onClick={handleClick} id="varsity" size="Large">
          Varsity
        </Button>
        <Button onClick={handleClick} id="juniorVarsity" size="Large">
          Jv
        </Button>
        <Button onClick={handleClick} id="freshman" size="Large">
          Freshman
        </Button>
      </Box>
    </Grid>
  );
}