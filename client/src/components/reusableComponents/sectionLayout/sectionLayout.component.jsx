// client/src/components/SectionLayout.jsx
import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const defaultSectionStyles = {
  marginBlock: "5.3125rem",
};

const SectionLayout = ({ id, ariaLabel, children, ...rest }) => {
  return (
    <Box
      component="section"
      id={id}
      aria-label={ariaLabel}
      sx={{
        ...defaultSectionStyles,
        ...rest.sx,
      }}
      {...rest}
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
