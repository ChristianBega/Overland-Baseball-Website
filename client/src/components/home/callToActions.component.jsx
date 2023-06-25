import { Grid, Paper, styled, Link, Box, Typography } from "@mui/material";

// Images
import TeamSnap from "../../assets/homePage/teamSnap.webp";
import MaxPreps from "../../assets/homePage/maxPrepLogo.webp";
import CherryCreek from "../../assets/homePage/cherryCreek.webp";
import VenmoQrCode from "../../assets/homePage/venmoQRCode.webp";
import { useTheme } from "@emotion/react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.primary,
  background: theme.palette.accent.accentOne,
  border: `1px solid ${theme.palette.borders.primary}`,
  "&:hover": {
    // border: "1px solid red",
    transform: "scale(1.05)",
    // boxShadow: 50,
    boxShadow: `0px 0px 12px 1px ${theme.palette.secondary.light}`,
  },
}));

const ctaData = [
  {
    ctaName: "Team Snap",
    urlLink: "https://go.teamsnap.com/login/find_my_team",
    ctaImage: TeamSnap,
  },
  {
    ctaName: "Overland HS",
    urlLink: "https://www.cherrycreekschools.org/Page/5987",
    ctaImage: CherryCreek,
  },
  {
    ctaName: "Max Preps",
    urlLink: "https://go.teamsnap.com/login/find_my_team",
    ctaImage: MaxPreps,
  },
  {
    ctaName: "Venmo QR code",
    urlLink: "https://account.venmo.com/u/BlazersBaseball",
    ctaImage: VenmoQrCode,
  },
];
export default function CTAGrid() {
  const theme = useTheme();
  return (
    <Grid item xs={12} sx={{ minHeight: "475px", mt: 15 }}>
      <Typography typography="h3" sx={{ textAlign: "center", color: theme.palette.primary.main, mb: 10 }}>
        Quick Links
      </Typography>
      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        {ctaData.map((cta) => (
          <Grid key={cta.ctaName} item xs={6} sm={5} md={3} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Link sx={{ display: "flex", justifyContent: "center", maxWidth: "90%" }} href={cta.urlLink} target="_blank" rel="noopener noreferrer">
              <StyledPaper
                sx={{
                  height: { xs: "185px", sm: "300px", g: "350px" },
                  width: { xs: "185px", sm: "300px", md: "80%", lg: "350px" },
                  background: "transparent",
                  boxShadow: 10,
                }}
              >
                <Box component="img" src={cta.ctaImage} sx={{ objectFit: "contain", width: "100%", height: "100%", color: "#c3c1c1a0" }}></Box>
              </StyledPaper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
