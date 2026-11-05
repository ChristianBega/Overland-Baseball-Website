/** Section title block: small colored subtitle over a heading, with an optional CTA on the right. Use for every section title. */
import React from "react";
import PropTypes from "prop-types";
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

SectionHeader.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  // Subtitle color (CSS value, usually a theme palette token).
  color: PropTypes.string,
  // Rendered on the right of the header; callers pass `cond && <El />`, so `false` is allowed.
  cta: PropTypes.node,
  // Heading level/style; both default to "h2".
  titleProps: PropTypes.shape({
    component: PropTypes.elementType,
    variant: PropTypes.string,
  }),
};

export default SectionHeader;
