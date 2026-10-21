import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material";

const STYLE_ONLY_PROPS = ["marginZero", "marginBlock", "customMargin"];

const StyledSectionLayout = styled("div", {
  shouldForwardProp: (prop) => !STYLE_ONLY_PROPS.includes(prop),
})(({ theme, ...rest }) => ({
  ...rest.sx,
  ...(rest?.marginBlock && { marginBlock: "4rem !important" }),
  ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "4rem !important" }),
  ...(rest?.customMargin && { margin: rest.customMargin }),

  [theme.breakpoints.up("tablet")]: {
    ...(rest?.marginBlock && { marginBlock: "5.3125rem !important" }),
    ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "5.3125rem !important" }),
    ...(rest?.customMargin && { margin: rest.customMargin }),
  },
  [theme.breakpoints.up("laptop")]: {
    ...(rest?.marginBlock && { marginBlock: "5.75rem !important" }),
    ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "5.75rem !important" }),
    ...(rest?.customMargin && { margin: rest.customMargin }),
  },
  [theme.breakpoints.up("lg")]: {
    ...(rest?.marginBlock && { marginBlock: "6rem !important" }),
    ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "8rem !important" }),
    ...(rest?.customMargin && { margin: rest.customMargin }),
  },
}));

const SectionLayout = ({ id, ariaLabel, children, ...rest }) => {
  // Callers pass `aria-label` (in `rest`); Staff passes `ariaLabel` via StyledSectionLayoutWrapper.
  const label = rest["aria-label"] ?? ariaLabel;
  return (
    <StyledSectionLayout {...rest} as="section" id={id} aria-label={label}>
      {children}
    </StyledSectionLayout>
  );
};

SectionLayout.propTypes = {
  id: PropTypes.string.isRequired,
  // One of `aria-label` (preferred) or legacy `ariaLabel` should be passed.
  "aria-label": PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
