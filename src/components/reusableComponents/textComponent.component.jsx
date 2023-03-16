import { Grid, Typography } from "@mui/material";
import React from "react";

export default function TextComponent({ data }) {
  console.log(data);
  // const { content, id, ...data } = data;
  // console.log(content, id);
  return (
    <>
      <Grid xs={12} item>
        <Typography typography="smallBodyText">{data.content}</Typography>
      </Grid>
    </>
  );
}
