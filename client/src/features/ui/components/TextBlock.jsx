import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";

const TextBlock = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>;
};

export default TextBlock;

TextBlock.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }),
};
