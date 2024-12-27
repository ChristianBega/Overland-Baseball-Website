import React from "react";
// Mui Components
import { Grid, Link, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
// Utils & Helpers
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";
// Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function ContactUs() {
  const theme = useTheme();
  const { isMd } = useMediaQueries();
  const iconStyle = {
    color: theme.palette.secondary.main,
    fontSize: "1.3rem",
  };

  return (
    <Grid item xs={12} md={4} id="contact-us-grid-item" order={isMd ? 3 : 2}>
      <Typography component="h2" variant="h4" textAlign="center" fontWeight="bold" mb={1}>
        Contact us
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={1}>
        <PhoneIcon sx={{ ...iconStyle }} />
        <Link href="tel:+17205053962">
          <Typography>720-505-3962</Typography>
        </Link>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={1}>
        <EmailIcon sx={{ ...iconStyle }} />
        <Link href="mailto:mbega@cherrycreekschools.org">
          <Typography>mbega@cherrycreekschools.org</Typography>
        </Link>
      </Stack>
    </Grid>
  );
}

{
  /* <Typography typography="h5">Contact us</Typography>
      <Stack spacing={3} mt={4} sx={{ color: theme.palette.secondary.main }}>
        <ContactContainer sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <PhoneIcon />
          <a href="tel:+17205053962" style={{ color: theme.palette.secondary.main }}>
            <Typography ml={2}>720-505-3962</Typography>
          </a>
        </ContactContainer>
        <ContactContainer sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <EmailIcon />
          <a href="mailto:mbega@cherrycreekschools.org" style={{ color: theme.palette.secondary.main }}>
            <Typography ml={2}>mbega@cherrycreekschools.org</Typography>
          </a>
        </ContactContainer>
      </Stack> */
}
