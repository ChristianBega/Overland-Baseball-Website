export const styles = {
  section: {
    backgroundSize: "cover",
    backgroundPosition: "center top",
    textAlign: "center",
    color: "#fff",
    padding: "2rem 1rem",
    minHeight: "550px",
    height: "calc(80vh - 64px)",

    "@media (min-width: 600px)": {
      minHeight: "600px",
    },

    "@media (min-width: 662px)": {
      minHeight: "670px",
    },
    "@media (min-width: 900px)": {
      minHeight: "700px",
    },
    "@media (min-width: 1200px)": {
      height: "760px",
      // justifyContent: "flex-start",
    },
    "@media (min-width: 1400px)": {
      height: "800px",
    },
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    position: "relative",
    // maxHeight: "760px",
  },
  typography: {
    zIndex: 1000,
    fontFamily: "Varsity Regular",
    fontSize: "75px",
    lineHeight: "65px",
    marginBottom: 0,
    color: "#ffffff",
    textTransform: "lowercase",
    width: "100%",
    marginTop: "90px",
    "@media (min-width: 600px)": {
      fontSize: "95px",
      lineHeight: "85px",
    },
    "@media (min-width: 900px)": {
      fontSize: "115px",
      lineHeight: "105px",
    },
    "@media (min-width: 1200px)": {
      marginTop: "120px",
      fontSize: "130px",
      lineHeight: "110px",
    },
  },
  text: {
    zIndex: 1000,
    marginTop: "1rem",
    maxWidth: 590,
    margin: "2rem auto 0 auto",
  },
};
