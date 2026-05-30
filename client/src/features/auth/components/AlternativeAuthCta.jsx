import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import GoogleIcon from "../../../assets/icons/google-logo.svg";
// import FacebookIcon from "../../../assets/icons/facebook-logo.svg";
// Utils
import { signInWithGoogle } from "../utils/authUtils";

const lineStyles = {
  border: "1px solid hsl(0, 0%, 90%)",
  width: "30%",
};

const AlternativeAuthCta = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setErrorMessage(""); // Clear previous errors

    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      if (error.message === "Sign-in cancelled") {
        // User closed the popup, don't show error
        return;
      }
      setErrorMessage(error.message || "Google sign-in failed. Please try again.");
      console.error("Google sign-in error:", error);
    }
  };

  // ! Integrate Later - Might not be needed right now
  // // Facebook Sign-In Handler
  // const handleFacebookSignIn = async () => {
  //   setErrorMessage(""); // Clear previous errors

  //   try {
  //     await signInWithFacebook();
  //     navigate("/");
  //   } catch (error) {
  //     if (error.message === "Sign-in cancelled") {
  //       // User closed the popup, don't show error
  //       return;
  //     }
  //     setErrorMessage(error.message || "Facebook sign-in failed. Please try again.");
  //     console.error("Facebook sign-in error:", error);
  //   }
  // };

  return (
    <Box sx={{ my: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <div style={lineStyles}></div>
        <Typography component="span" variant="small" sx={{ display: "inline-block" }}>
          Or Sign In With
        </Typography>
        <div style={lineStyles}></div>
      </Stack>

      {/* Error Message Display */}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={2}>
        <Button variant="alternativeSignIn" aria-label="Sign In With Google Button" onClick={handleGoogleSignIn}>
          <img src={GoogleIcon} alt="Google Icon" />
        </Button>
        {/* <Button variant="alternativeSignIn" aria-label="Sign In With Facebook Button" onClick={handleFacebookSignIn}>
          <img src={FacebookIcon} alt="Facebook Icon" />
        </Button> */}
      </Stack>
    </Box>
  );
};

export default AlternativeAuthCta;
