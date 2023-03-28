import { Grid, Typography } from "@mui/material";
import React from "react";

export default function TextComponent({ boosterData, eventsData, location }) {
  return (
    <>
      {location === "boosters" && (
        <Grid xs={12} item>
          <Typography sx={{ backgroundColor: "lightcyan", height: "275px", p : 4 }} typography={{ xs: "smallBodyText", md : "largeBodyText" }}>
            {boosterData.content}
          </Typography>
        </Grid>
      )}
    </>
  );
}

// {location === "events" && (
//   <Typography typography="smallBodyText">
//     {/* Data is being passed into textComponent, but data isn't being displayed... do i need context for state???? */}
//     {eventsData.content}
//   </Typography>
// )}
