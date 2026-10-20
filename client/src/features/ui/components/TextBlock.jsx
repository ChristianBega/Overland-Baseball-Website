import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";

const TextBlock = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>;
};

export default TextBlock;

TextBlock.propTypes = {
  children: PropTypes.node,
};
