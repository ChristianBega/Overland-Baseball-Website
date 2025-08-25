import React from "react";
import { Stack, Typography } from "@mui/material";
import TextBlock from "./TextBlock";

const SectionHeader = ({ title, subtitle, color, cta, titleProps, ...rest }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" {...rest}>
      <TextBlock>
        <span style={{ textTransform: "uppercase", fontSize: "14px", fontWeight: "600", color: color, letterSpacing: "0.05em" }}>{subtitle}</span>
        <Typography typography={titleProps?.variant || "h2"} component={titleProps?.component || "h2"}>
          {title}
        </Typography>
      </TextBlock>
      {cta && cta}
    </Stack>
  );
};

export default SectionHeader;
