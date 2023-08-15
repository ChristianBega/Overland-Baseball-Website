import React from "react";
import { newsData } from "../../websiteData/home.data";
import { Grid, Typography, Box, Link, styled } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import Socials from "../reusableComponents/socials.component";
import { useTheme } from "@emotion/react";

export default function News() {
  const { newsOne, newsLink, newsTwo } = newsData[0];
  const theme = useTheme();

  const StyledHashLink = styled(HashLink)(({ theme }) => ({
    textDecoration: "underline",
    color: "#21c067",
    "&:hover": {
      cursor: "pointer",
      color: "#007f3b",
    },
  }));
  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "underline",
    color: "#21c067",
    "&:hover": {
      cursor: "pointer",
      color: "#007f3b",
    },
  }));

  const StyledInlineText = styled(Typography)(({ theme }) => ({
    display: "inline",
  }));
  return (
    <Grid item xs={12} md={7} lg={6} sx={{ position: "relative" }}>
      <Box sx={{ minHeight: { xs: "300px", md: "400px" }, p: 4 }}>
        <Typography typography="h1" component="h1">
          Blazer's News
        </Typography>
        <StyledInlineText typography="p" component="p">
          {newsOne}
        </StyledInlineText>
        {newsLink?.map(({ name, pathname, linkType, section }, index) => {
          return (
            <StyledInlineText typography="p" component="p">
              {index + 1 === newsLink.length ? (
                <>
                  &nbsp;
                  <StyledInlineText typography="span" component="span">
                    and
                  </StyledInlineText>
                  &nbsp;
                  {linkType === "href" ? <StyledLink href={pathname}>{name}</StyledLink> : <StyledHashLink to={pathname}>{name}</StyledHashLink>}
                  <StyledInlineText typography="span" component="span">
                    .
                  </StyledInlineText>
                </>
              ) : (
                <>
                  &nbsp;
                  {linkType === "href" ? <StyledLink href={pathname}>{name}</StyledLink> : <StyledHashLink to={pathname}>{name}</StyledHashLink>}
                  <StyledInlineText typography="span" component="span">
                    ,
                  </StyledInlineText>
                </>
              )}
            </StyledInlineText>
          );
        })}
        <Typography typography="p" component="p" sx={{ display: "block", mt: theme.spacing(4) }}>
          {newsTwo}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
          <Socials />
        </Box>
      </Box>
    </Grid>
  );
}
