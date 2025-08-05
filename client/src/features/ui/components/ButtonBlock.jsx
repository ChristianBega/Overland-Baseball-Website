import { Stack } from "@mui/material";
import React from "react";

const ButtonBlock = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>;
};

export default ButtonBlock;
