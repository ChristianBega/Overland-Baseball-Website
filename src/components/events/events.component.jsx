import { Grid, List } from "@mui/material";
import React from "react";
import EventItems from "./eventItems.component";

export default function Events() {
  return (
    <Grid item>
      <List>
        <EventItems />
      </List>
    </Grid>
  );
}
