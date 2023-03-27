import { Grid, Paper, styled, Link, Box } from "@mui/material";

// Images
import MaxPreps from "../../assets/maxPrepLogo.png";
import CherryCreek from "../../assets/cherryCreek.png";
import VenmoQrCode from "../../assets/venmoQRCode.jpg";

const StyledPaper = styled(Paper)(({ theme }) => ({
  textAlign: "center",
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
    ctaName: "Overland HS",
    urlLink: "https://www.cherrycreekschools.org/Page/127",
    ctaImage: CherryCreek,
  },
  {
    ctaName: "Max Preps",
    urlLink: "https://www.maxpreps.com/co/aurora/overland-trailblazers/baseball/",
    ctaImage: MaxPreps,
  },
  {
    ctaName: "Venmo QR code",
    urlLink: "/",
    ctaImage: VenmoQrCode,
  },
];
export default function CTAGrid() {
  return (
    <Grid item xs={12} lg={2}>
      <Grid container sx={{ height: "100%" }} spacing={2}>
        {ctaData.map((cta) => (
          <Grid key={cta.ctaName} item xs={6} md={3} lg={12} sx={{ height: {xs : "220px", lg : "25%"}, }}>
            <Link href={cta.urlLink} target="_blank" rel="noopener noreferrer">
              <StyledPaper sx={{ height: "100%", background: "transparent" }}>
                <Box component="img" src={cta.ctaImage} sx={{ objectFit: "cover", width: "100%", height: "100%" }}></Box>
              </StyledPaper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
