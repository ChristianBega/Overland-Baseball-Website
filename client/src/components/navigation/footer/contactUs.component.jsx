import React from "react";
// Mui Components
import { Grid, Typography, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";

// Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function ContactUs() {
  const theme = useTheme();
  return (
    <Grid id="contact-us-grid-item" sx={{ display: "flex", flexDirection: "column", textAlign: "center", mb: 5 }}>
      <Typography typography="h5">Contact us</Typography>
      <Stack spacing={3} mt={4} sx={{ color: theme.palette.secondary.main }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <PhoneIcon />
          <Typography ml={2}>720-505-3962</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <EmailIcon />
          <Typography ml={2}>mbega@cherrycreekschools.org</Typography>
        </Box>
      </Stack>
    </Grid>
  );
}
