import { Checkbox, InputLabel } from "@mui/material";
import React from "react";

const CheckBoxField = ({ ...props }) => {
  return (
    <>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <Checkbox {...props} sx={{ display: "inline-block" }} defaultUnchecked variant="outlined" variable />;
    </>
  );
};

export default CheckBoxField;
