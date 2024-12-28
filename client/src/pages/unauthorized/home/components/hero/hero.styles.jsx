// import styled from "@emotion/styled";
// import { Box } from "@mui/material";

// // export const StyledHeroSection = styled(Box)(({ backgroundImage }) => ({}));

export const styles = {
  section: {
    backgroundSize: "cover",
    backgroundPosition: "center top",
    textAlign: "center",
    color: "#fff",
    padding: "2rem 1rem",
    height: "550px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  box: {
    position: "relative",
    margin: "0 auto",
  },
  typography: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Varsity Regular",
    fontSize: "45px",
    marginBottom: 0,
    color: "#003366",
    textShadow: `
      -1px -1px 0 #ffffff,
      1px -1px 0 #ffffff,
      -1px 1px 0 #ffffff,
      1px 1px 0 #ffffff,
      0 0 1px #ffffff
    `,
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    margin: "auto",
    display: "block",
  },
  text: {
    marginTop: "1rem",
  },
  stack: {
    marginTop: "2rem",
  },
};
