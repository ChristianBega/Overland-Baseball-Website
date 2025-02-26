import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
// Icons
import GoogleIcon from "../../../../assets/icons/google-logo.svg";
import FacebookIcon from "../../../../assets/icons/facebook-logo.svg";
const lineStyles = {
  border: "1px solid hsl(0, 0%, 90%)",
  width: "30%",
};
const AlternativeAuthCta = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <div style={lineStyles}></div>
        <Typography component="span" variant="small" sx={{ display: "inline-block" }}>
          Or Sign In With
        </Typography>
        <div style={lineStyles}></div>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={2}>
        <Button variant="alternativeSignIn" aria-label="Sign In With Google Button">
          <img src={GoogleIcon} alt="Google Icon" />
        </Button>
        <Button variant="alternativeSignIn" aria-label="Sign In With Facebook Button">
          <img src={FacebookIcon} alt="Facebook Icon" />
        </Button>
      </Stack>
    </Box>
  );
};

export default AlternativeAuthCta;
