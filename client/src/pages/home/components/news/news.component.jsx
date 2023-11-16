import React from "react";
import { newsData } from "../../../../websiteData/home.data";
import { Grid, Typography, Box, Link, styled } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import Socials from "../../../../components/reusableComponents/socials.component";
import { useTheme } from "@emotion/react";
export default function News() {
  const { newsOne, newsLink, newsTwo } = newsData[0];
  const theme = useTheme();

  const StyledTextBox = styled(Box)(({ theme }) => ({
    minHeight: "300px",
    padding: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      minHeight: "400px",
    },
  }));
  const StyledSocialBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  }));
  const StyledHashLink = styled(HashLink)(({ theme }) => ({
    textDecoration: "underline",
    color: "#21c067",
    transition: "all .3s ease-In-Out",
    "&:hover": {
      cursor: "pointer",
      color: "#007f3b",
    },
  }));
  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "underline",
    color: "#21c067",
    transition: "all .3s ease-In-Out",
    "&:hover": {
      cursor: "pointer",
      color: "#007f3b",
    },
  }));

  const renderLink = (name, pathname, linkType) =>
    linkType === "href" ? (
      <StyledLink href={pathname}>{name}</StyledLink>
    ) : (
      <StyledHashLink to={pathname} state={{ name: name }}>
        {name}
      </StyledHashLink>
    );
  const renderSpan = (char) => (
    <Typography typography="span" component="span">
      {char}
    </Typography>
  );

  return (
    <Grid item xs={12} md={12} lg={6} sx={{ position: "relative" }}>
      <StyledTextBox>
        <Typography typography="h1" component="h1">
          Blazer's News
        </Typography>
        <Typography typography="p" component="p">
          {newsOne}
        </Typography>
        {newsLink?.map(({ name, pathname, linkType }, index) => {
          return (
            <Typography typography="p" component="p" key={index}>
              {index + 1 === newsLink.length ? (
                <>
                  &nbsp;
                  {renderSpan("and")}
                  &nbsp;
                  {renderLink(name, pathname, linkType)}
                  {renderSpan(".")}
                </>
              ) : (
                <>
                  &nbsp;
                  {renderLink(name, pathname, linkType)}
                  {renderSpan(",")}
                </>
              )}
            </Typography>
          );
        })}
        <Typography typography="p" component="p" sx={{ display: "block", mt: theme.spacing(4) }}>
          {newsTwo}
        </Typography>
        <StyledSocialBox>
          <Socials />
        </StyledSocialBox>
      </StyledTextBox>
    </Grid>
  );
}
