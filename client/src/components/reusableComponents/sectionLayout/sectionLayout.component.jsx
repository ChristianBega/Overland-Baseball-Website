// client/src/components/SectionLayout.jsx
import React from "react";
import PropTypes from "prop-types";
import { Box, styled } from "@mui/material";

const StyledSectionLayout = styled(Box)(({ theme, ...rest }) => ({
  ...rest.sx,
  ...(rest?.marginBlock && { marginBlock: "4rem !important" }),
  ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "4rem !important" }),

  [theme.breakpoints.up("tablet")]: {
    ...(rest?.marginBlock && { marginBlock: "5.3125rem !important" }),
    ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "5.3125rem !important" }),
  },
  [theme.breakpoints.up("laptop")]: {
    ...(rest?.marginBlock && { marginBlock: "5.75rem !important" }),
    ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "5.75rem !important" }),
  },
  [theme.breakpoints.up("lg")]: {
    ...(rest?.marginBlock && { marginBlock: "6rem !important" }),
    ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "6rem !important" }),
  },
}));

const SectionLayout = ({ id, ariaLabel, children, ...rest }) => {
  return (
    <StyledSectionLayout {...rest} component="section" id={id} aria-label={ariaLabel}>
      {children}
    </StyledSectionLayout>
  );
};

SectionLayout.propTypes = {
  id: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
