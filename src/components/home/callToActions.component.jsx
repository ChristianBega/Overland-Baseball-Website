import { Grid, Paper, styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  // flex: 1,
  // margin: theme.spacing(8),
  textAlign: "center",
  // minHeight: "50%",
  // padding: theme.spacing(15), // 14px
  color: theme.palette.text.primary,
  background: theme.palette.accent.accentOne,
}));

const ctaData = [
  {
    ctaName: "Team store",
    urlLink: "Link",
    ctaImage: "Image",
  },
  {
    ctaName: "Team store",
    urlLink: "Link",
    ctaImage: "Image",
  },
  {
    ctaName: "Team store",
    urlLink: "Link",
    ctaImage: "Image",
  },
  {
    ctaName: "Team store",
    urlLink: "Link",
    ctaImage: "Image",
  },
];
export default function TeamStore() {
  return (
    <Grid item xs={12} lg={5}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        {ctaData.map((cta) => (
          <Grid key={cta.ctaName} item xs={6} md={3} lg={6}>
            <Link>
              <StyledPaper sx={{ bgcolor: "blue", minHeight: { xs: "160px", md: "180px", lg: "220x" } }}>{cta.ctaName}</StyledPaper>
            </Link>
          </Grid>
        ))}
        {/* 
        <Grid item xs={6} md={3} lg={6}>
          <StyledPaper sx={{ bgcolor: "red", minHeight: "50%" }}>Documents</StyledPaper>
        </Grid>
        <Grid item xs={6} md={3} lg={6}>
          <StyledPaper sx={{ bgcolor: "orange", minHeight: "50%" }}>CashApp QR code</StyledPaper>
        </Grid>
        <Grid item xs={6} md={3} lg={6}>
          <StyledPaper sx={{ bgcolor: "green", minHeight: "50%" }}>Events</StyledPaper>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
