import React from "react";
// Mui Components
import { Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

// Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
export default function ContactUs() {
  return (
    <Grid id="contact-us-grid-item" item sx={{ display: "flex", flexDirection: "column" }}>
      <Typography typography="h5">Contact us</Typography>
      <Stack>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <PhoneIcon />
          <Typography>000-111-2222</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <EmailIcon />
          <Typography>baseball@gmail.com</Typography>
        </Box>
      </Stack>
    </Grid>
  );
}
