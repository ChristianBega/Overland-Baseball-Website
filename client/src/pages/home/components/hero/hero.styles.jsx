export const styles = {
  section: {
    backgroundSize: "cover",
    backgroundPosition: "center top",
    textAlign: "center",
    color: "#fff",
    padding: "2rem 1rem",
    minHeight: "550px",
    height: "calc(80vh - 64px)",
    "@media (max-width: 600px)": {
      padding: "1.5rem",
      minHeight: "450px",
    },
    "@media (min-width: 900px)": {
      minHeight: "650px",
    },
    "@media (min-width: 1200px)": {
      height: "72vh",
      // justifyContent: "flex-start",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  typography: {
    fontFamily: "Varsity Regular",
    fontSize: "75px",
    lineHeight: "65px",
    marginBottom: 0,
    color: "#ffffff",
    textTransform: "lowercase",
    width: "100%",
    "@media (min-width: 600px)": {
      fontSize: "95px",
      lineHeight: "85px",
    },
    "@media (min-width: 900px)": {
      fontSize: "115px",
      lineHeight: "105px",
    },
    "@media (min-width: 1200px)": {
      fontSize: "130px",
      lineHeight: "110px",
    },
  },
  text: {
    marginTop: "1rem",
    maxWidth: 590,
    margin: "2rem auto 0 auto",
  },
};
