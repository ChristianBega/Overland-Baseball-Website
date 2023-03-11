import React from "react";
import HeroBackground from "../components/home/heroBg.component";
import { Container, styled, Typography } from "@mui/material";
import { Paper } from "@mui/material";
const StyledPaper = styled(Paper)(({ theme }) => ({
  // display: "flex",
  // justifyContent: "space-between",
  marginTop: theme.spacing(5),
  textAlign: "center",
  padding: theme.spacing(6), // 14px
  color: theme.palette.text.primary,
  background: theme.palette.accent.accentOne,
}));
export default function HomePage() {
  // const theme = useTheme();
  return (
    <>
      <HeroBackground />
      <Container maxWidth="lg">
        {/* <StyledPaper>
          <Typography typography="h1">Overland Baseball</Typography>
          <Typography typography="bodyTextLg" mt={4}>
            Dignissimos et possimus autem in aspernatur possimus id expedita atque. Ut galisum nostrum in galisum omnis sit voluptatem ipsa sit enim
            cumque et voluptatem facilis!
          </Typography>
        </StyledPaper> */}
      </Container>
    </>
  );
}
