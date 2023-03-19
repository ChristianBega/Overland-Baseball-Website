import { Grid, Typography } from "@mui/material";
import React from "react";

export default function TextComponent({ boosterData, eventsData, location }) {
  return (
    <>
      {location === "boosters" && (
        <Grid xs={12} item>
          <Typography typography="smallBodyText">{boosterData.content}</Typography>
        </Grid>
      )}
      {location === "events" && (
        <Typography typography="smallBodyText">
          {eventsData.content}
          testing
        </Typography>
      )}
    </>
  );
}
