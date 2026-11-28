import React from "react";
import { Container, Typography } from "@mui/material";
import { Navigation } from "../../navigation";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

export default function SponsorsPage() {
  useDocumentTitle("Sponsors | Overland Baseball");
  return (
    <>
      <Navigation />
      <Container
        component="main"
        id="sponsors-page"
        aria-label="Sponsors Page"
      >
        <Typography variant="h1" component="h1" sx={{ fontSize: "2.5rem", my: 3 }}>
          Sponsors
        </Typography>
        <Typography variant="body1">
          Our sponsors page is coming soon. Thank you to every business that
          supports Overland Baseball.
        </Typography>
      </Container>
    </>
  );
}
