import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { commonInputStyles, commonLabelStyles, inputVariants, mergeStyles } from "./shared.styles";

// ! useControlled.js:18 MUI: A component is changing the uncontrolled value state of Select to be controlled. Elements should not switch from uncontrolled to controlled (or vice versa).Decide between using a controlled or uncontrolled Select element for the lifetime of the component. The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.

const SelectInputField = ({ cssProps, options = [], label, value, onChange, ...props }) => {
  const inputStyles = mergeStyles(
    commonInputStyles,
    inputVariants.select,
    {
      height: "40px",
      padding: "8px 12px",
      "& .MuiSelect-select": {
        padding: "8px 12px",
      },
    },
    cssProps?.input
  );

  const labelStyles = mergeStyles(
    commonLabelStyles,
    {
      position: "relative",
      transform: "none",
      marginBottom: "4px",
    },
    cssProps?.label
  );

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel shrink={false} sx={labelStyles}>
        {label}
      </InputLabel>
      <Select value={value || ""} onChange={onChange} sx={inputStyles} displayEmpty {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInputField;
