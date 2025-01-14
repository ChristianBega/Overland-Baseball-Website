// client/src/components/SectionLayout.jsx
import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const SectionLayout = ({ id, ariaLabel, children, ...rest }) => {
  return (
    <Box
      component="section"
      id={id}
      aria-label={ariaLabel}
      sx={{
        ...rest.sx,
        ...(rest?.marginBlock && { marginBlock: "5.3125rem !important" }),
        ...(rest?.marginZero ? { marginTop: "0" } : { marginTop: "5.3125rem !important" }),
      }}
    >
      {children}
    </Box>
  );
};

SectionLayout.propTypes = {
  id: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
