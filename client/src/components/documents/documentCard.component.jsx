import React from "react";
import { Card, CardActions, CardContent, Grid, Link, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function DocumentCard({ data }) {
  const theme = useTheme();
  return (
    <Grid id="document-grid-item" item xs={12} sm={6}>
      <Card sx={{ textAlign: "center", minHeight: "260px", width: "100%", boxShadow: 10 }}>
        <CardContent>
          <Typography variant="h5" color={theme.palette.primary.main}>
            {data.documentName}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 5 }}>
          <Link href={data.documentLink} target="_blank" rel="noopener noreferrer" sx={{ height: "100%", width: "100%", textDecoration: "none" }}>
            <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }} color={theme.palette.secondary.main}>
              Read more
            </Typography>
          </Link>
          {/* <Button sx={{ maxWidth: "50%", margin: "auto", p: 0 }}>
            <a id="download" href={data.download} download={data.download}>
              Download Resume
            </a>
          </Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
}
