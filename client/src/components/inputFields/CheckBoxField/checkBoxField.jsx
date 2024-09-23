import { Checkbox } from "@mui/material";
import React from "react";

const CheckBoxField = ({ ...props }) => {
  return <Checkbox {...props} sx={{ display: "inline-block" }} defaultUnchecked variant="outlined" variable />;
};

export default CheckBoxField;
