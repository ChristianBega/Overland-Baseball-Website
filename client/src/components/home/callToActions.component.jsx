import { Grid, Paper, styled, Link, Box } from "@mui/material";

// Images
import GameChanger from "../../assets/gameChanger.logo.jpeg";
import MaxPreps from "../../assets/maxPrepLogo.png";
import CherryCreek from "../../assets/cherryCreek.png";
import VenmoQrCode from "../../assets/venmoQRCode.jpg";

const StyledPaper = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.primary,
  background: theme.palette.accent.accentOne,
  "&:hover": {
    // border: "1px solid red",
    transform: "scale(1.05)",
    // boxShadow: 50,
    boxShadow: `0px 0px 12px 1px ${theme.palette.secondary.light}`,
  },
}));

const ctaData = [
  {
    ctaName: "Game Changer",
    urlLink: "Link",
    ctaImage: GameChanger,
  },
  {
    ctaName: "Overland HS",
    urlLink: "https://www.cherrycreekschools.org/Page/5987",
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
    <Grid item xs={12} mt={10}>
      <Grid container sx={{ height: "100%" }} spacing={4}>
        {ctaData.map((cta) => (
          <Grid key={cta.ctaName} item xs={6} md={3} lg={3} sx={{ maxHeight: { xs: "240px" } }}>
            <Link href={cta.urlLink} target="_blank" rel="noopener noreferrer">
              <StyledPaper sx={{ height: "75%", background: "transparent" }}>
                <Box component="img" src={cta.ctaImage} sx={{ objectFit: "contain", width: "100%", height: "100%" }}></Box>
              </StyledPaper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
