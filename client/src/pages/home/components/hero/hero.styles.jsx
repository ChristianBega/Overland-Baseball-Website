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
      minHeight: "600px",
    },
    "@media (min-width: 900px)": {
      minHeight: "650px",
    },
    "@media (min-width: 1200px)": {
      // height: "700px",
    },
    "@media (min-width: 1400px)": {
      height: "700px",
    },
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  typography: {
    zIndex: 1000,
    fontFamily: "Varsity Regular",
    fontSize: "85px",
    lineHeight: "65px",
    marginBottom: 0,
    color: "#ffffff",
    textTransform: "lowercase",
    width: "100%",
    "@media (min-width: 600px)": {
      // marginTop: "55px",
      fontSize: "95px",
      lineHeight: "85px",
    },
    "@media (min-width: 900px)": {
      fontSize: "115px",
      lineHeight: "105px",
    },
    "@media (min-width: 1200px)": {
      marginTop: "80px",
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
