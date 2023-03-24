import React from "react";
// Mui Components
import { Grid, Typography, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";

// Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function ContactUs() {
  const theme = useTheme()
  return (
    <Grid id="contact-us-grid-item"  sx={{ display: "flex", flexDirection: "column" }}>
      <Typography typography={{xs:"bodyTextSm", md:"bodyTextLg"}} >Contact us</Typography>
      <Stack spacing={3} mt={4} sx={{color:theme.palette.secondary.main}}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <PhoneIcon />
          <Typography ml={2} >000-111-2222</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <EmailIcon />
          <Typography ml={2}>baseball@gmail.com</Typography>
        </Box>
      </Stack>
    </Grid>
  );
}
