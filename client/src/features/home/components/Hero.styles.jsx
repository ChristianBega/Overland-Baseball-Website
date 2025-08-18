import { styled, Typography } from "@mui/material";
import SectionLayout from "../../ui/components/SectionLayout";

export const StyledSectionLayout = styled(SectionLayout)(({ theme, backgroundImage }) => ({
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "3rem",
  backgroundImage: `url(${backgroundImage})`,
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  textAlign: "center",
  color: "#fff",
  height: "100%",
  display: "flex",
  position: "relative",
  minHeight: "800px",
  [theme.breakpoints.up("sm")]: {
    // borderRadius: "20px",
    minHeight: "600px",
  },
  [theme.breakpoints.up("662")]: {
    minHeight: "600px",
  },
  [theme.breakpoints.up("md")]: {
    // borderRadius: "20px",
    minHeight: "650px",
  },
  [theme.breakpoints.up("lg")]: {
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    height: "720px",
  },
  [theme.breakpoints.up("xl")]: {
    height: "850px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(135deg, rgba(9, 31, 64, 0.6) 0%, rgba(9, 31, 64, 0.6) 50%, rgba(9, 31, 64, 0.6) 100%)`,
  },
}));

export const StyledHeroTypography = styled(Typography)(({ theme }) => ({
  zIndex: 1000,
  fontFamily: "Varsity Regular",
  fontSize: "85px",
  lineHeight: "65px",
  color: "#ffffff",
  textTransform: "lowercase",
  width: "100%",
  marginBottom: "1rem",
  // marginTop: "80px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "105px",
    lineHeight: "85px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "115px",
    lineHeight: "105px",
  },
  [theme.breakpoints.up("lg")]: {
    marginTop: "80px",
    fontSize: "130px",
    lineHeight: "110px",
  },
}));
