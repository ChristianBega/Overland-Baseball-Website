import React from "react";
import { Stack, Typography } from "@mui/material";
import TextBlock from "./TextBlock";

const SectionHeader = ({ title, subtitle, color, cta }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <TextBlock>
        <span style={{ textTransform: "uppercase", fontSize: "14px", fontWeight: "600", color: color, letterSpacing: "0.05em" }}>{subtitle}</span>
        <Typography typography="h2" component="h2">
          {title}
        </Typography>
      </TextBlock>
      {cta && cta}
    </Stack>
  );
};

export default SectionHeader;
