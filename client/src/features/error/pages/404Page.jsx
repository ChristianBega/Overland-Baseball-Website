import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";

const Error404Page = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container
      sx={{ textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        We're sorry for the inconvenience. The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Container>
  );
};

export default Error404Page;
