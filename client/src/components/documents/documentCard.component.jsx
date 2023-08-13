import React from "react";
import { Button, Card, CardActions, CardContent, Grid, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// PDFs
import codeOfConduct from "../../websiteData/documents/codeOfConduct.pdf";
import parentPlayer from "../../websiteData/documents/parentPlayer.pdf";
import teamLetter from "../../websiteData/documents/teamLetter.pdf";
import styled from "@emotion/styled";

// Icons
import DownloadIcon from "@mui/icons-material/Download";

const StyledCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  minHeight: "260px",
  width: "100%",
  border: `1px solid ${theme.palette.borders.primary}`,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));
const StyledTypography = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.light,
    cursor: "pointer",
    transition: ".3s all ease-in-out",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#fff",
}));
export default function DocumentCard({ data, index }) {
  const theme = useTheme();
  return (
    <Grid id="document-grid-item" item xs={12} sm={6}>
      <StyledCard elevation={8}>
        <CardContent>
          <Typography variant="h5" color={theme.palette.primary.main}>
            {data.documentName}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 5 }}>
          <Link href={data.documentLink} target="_blank" rel="noopener noreferrer" sx={{ height: "100%", width: "100%", textDecoration: "none" }}>
            <StyledTypography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }} color={theme.palette.secondary.main}>
              <u>Read more</u>
            </StyledTypography>
          </Link>
          <Button sx={{ maxWidth: "50%", margin: "auto", p: 0 }}>
            {index === 0 && (
              <StyledLink href={parentPlayer} download={parentPlayer}>
                <Stack direction="row" gap={2}>
                  <DownloadIcon />
                  <Typography>Download</Typography>
                </Stack>
              </StyledLink>
            )}
            {index === 1 && (
              <StyledLink href={codeOfConduct} download={codeOfConduct}>
                <Stack direction="row" gap={2}>
                  <DownloadIcon />
                  <Typography>Download</Typography>
                </Stack>
              </StyledLink>
            )}
            {index === 2 && (
              <StyledLink href={teamLetter} download={teamLetter}>
                <Stack direction="row" gap={2}>
                  <DownloadIcon />
                  <Typography>Download</Typography>
                </Stack>
              </StyledLink>
            )}
            {index === 3 && (
              <StyledLink href={codeOfConduct} download={codeOfConduct}>
                <Stack direction="row" gap={2}>
                  <DownloadIcon />
                  <Typography>Download</Typography>
                </Stack>
              </StyledLink>
            )}
          </Button>
        </CardActions>
      </StyledCard>
    </Grid>
  );
}
