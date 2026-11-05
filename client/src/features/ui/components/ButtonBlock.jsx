/** Stack that groups buttons/CTAs; extra props (spacing, direction, sx, ...) go to MUI Stack. */
import { Stack } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const ButtonBlock = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>;
};

ButtonBlock.propTypes = {
  children: PropTypes.node,
};

export default ButtonBlock;
