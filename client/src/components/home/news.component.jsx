import React from "react";
import { newsData } from "../../websiteData/home.data";
import { Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Socials from "../reusableComponents/socials.component";
import { useTheme } from "@emotion/react";

export default function News() {
  const { newsOne, newsLink, newsTwo } = newsData[0];
  const theme = useTheme();
  return (
    <Grid item xs={12} md={7} lg={6} sx={{ position: "relative" }}>
      <Box sx={{ minHeight: { xs: "300px", md: "400px" }, p: 4 }}>
        <Typography typography="h1" component="h1">
          Blazer's News
        </Typography>
        <Typography typography="p" component="p" sx={{ display: "inline" }}>
          {newsOne}
        </Typography>
        {newsLink?.map(({ name, urlPath }, index) => {
          return (
            <Typography typography="p" component="p" sx={{ display: "inline" }}>
              {index + 1 === newsLink.length ? (
                <>
                  &nbsp;
                  <Typography typography="span" component="span" sx={{ display: "inline" }}>
                    and
                  </Typography>
                  &nbsp;
                  <Link to={urlPath} sx={{ textDecoration: "underline !important" }}>
                    {name}
                  </Link>
                  <Typography typography="span" component="span" sx={{ display: "inline" }}>
                    .
                  </Typography>
                </>
              ) : (
                <>
                  &nbsp;
                  <Link to={urlPath} sx={{ textDecoration: "underline !important" }}>
                    {name}
                  </Link>
                  <Typography typography="span" component="span" sx={{ display: "inline" }}>
                    ,
                  </Typography>
                </>
              )}
            </Typography>
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
