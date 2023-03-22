import { Grid, Paper, styled, Link, Box, useTheme } from "@mui/material";

// Images
import MaxPreps from "../../assets/maxPrepLogo.png";
import CherryCreek from "../../assets/cherryCreek.png";

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
    ctaName: "Something else...",
    urlLink: "Link",
    ctaImage: "Image",
  },
];
export default function CTAGrid() {
  return (
    <Grid item xs={12} lg={2} >
      <Grid container spacing={{ xs: 4, md: 4 }} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        {ctaData.map((cta) => (
          <Grid key={cta.ctaName} item xs={6} md={3} lg={12} minHeight={{ xs: "260px", lg: "140px" }}>
            <Link href={cta.urlLink} target="_blank" rel="noopener noreferrer">
              <StyledPaper sx={{ height: "100%", background : "transparent" }}>
                <Box
                  component="img"
                  src={cta.ctaImage}
                  sx={{ objectFit: "cover", width: "100%", height: "100%", maxHeight: { xs: "260px", lg: "140px" } }}
                ></Box>
              </StyledPaper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
