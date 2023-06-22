import { Stack, TextField, Typography, Button } from "@mui/material";
import { useTheme } from "@emotion/react";

import React from "react";

export default function YouthProgramForm() {
  const theme = useTheme();

  return (
    <>
      <Typography
        sx={{ textTransform: "uppercase", textAlign: "center", my: 5, color: theme.palette.secondary.main }}
        id="modal-title"
        variant="h4"
        component="h2"
      >
        Overland's youth baseball program
      </Typography>
      <Stack id="modal-form" spacing={4}>
        <Typography variant="h6" component="h3">
          Player Information:
        </Typography>
        <TextField id="playerName" label="Player Name" variant="outlined" />
        <TextField id="playerEmail" label="Player Email" variant="outlined" />
        <TextField id="playerPhone" label="Player Phone Number" variant="outlined" />
        <Typography variant="h6" component="h3">
          Parent/Guardian Information:
        </Typography>
        <TextField id="playerName" label="Parent/Guardian Name" variant="outlined" />
        <TextField id="playerName" label="Parent/Guardian Email" variant="outlined" />
        <TextField id="playerName" label="Parent/Guardian Phone Number" variant="outlined" />
      </Stack>
      <Button sx={{ mt: 6, alignSelf: "center" }} id="submit" size="medium">
        Submit
      </Button>
    </>
  );
}
