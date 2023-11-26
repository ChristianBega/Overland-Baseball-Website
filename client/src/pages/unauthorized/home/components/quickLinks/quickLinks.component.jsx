import { Grid, Paper, styled, Link, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

// Images
import TeamSnap from "../../../../../assets/homePage/teamSnap.webp";
import MaxPreps from "../../../../../assets/homePage/maxPrepLogo.webp";
import CherryCreek from "../../../../../assets/homePage/cherryCreek.webp";
import VenmoQrCode from "../../../../../assets/homePage/venmoQRCode.webp";

const StyledQuickLinkCard = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.primary,
  background: theme.palette.accent.accentOne,
  border: `1px solid ${theme.palette.borders.primary}`,
  "&:hover": {
    transform: "scale(1.05)",
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
    urlLink: "https://www.maxpreps.com/co/aurora/overland-trailblazers/baseball/",
    ctaImage: MaxPreps,
  },
  {
    ctaName: "Venmo QR code",
    urlLink: "https://account.venmo.com/u/BlazersBaseball",
    ctaImage: VenmoQrCode,
  },
];
export default function QuickLinksGrid() {
  const theme = useTheme();
  return (
    <Grid id="quick-links" item xs={12} sx={{ minHeight: "425px", mt: 15 }}>
      <Typography typography="h2" component="h2" sx={{ textAlign: "center", color: theme.palette.primary.main, mb: 10 }}>
        Quick Links
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: { xs: ".5rem", lg: "1rem" } }}>
        {ctaData.map(({ urlLink, ctaImage }, index) => (
          <Link
            key={index}
            sx={{ display: "flex", justifyContent: "center", maxWidth: "90%" }}
            href={urlLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledQuickLinkCard
              sx={{
                height: { xs: "175px", sm: "200px", lg: "220px" },
                width: { xs: "175px", sm: "200px", lg: "220px" },
                background: "transparent",
                boxShadow: 10,
              }}
            >
              <Box component="img" src={ctaImage} sx={{ objectFit: "contain", width: "100%", height: "100%", color: "#c3c1c1a0" }}></Box>
            </StyledQuickLinkCard>
          </Link>
        ))}
      </Box>
    </Grid>
  );
}
