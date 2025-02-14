import React from "react";
import { styled, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// Styled component for the Select input
const StyledSelect = styled(Select)(({ selectTextColor }) => ({
  width: "100%",
  ...(selectTextColor && { "& .MuiSelect-select": { color: selectTextColor } }),
}));

// ! useControlled.js:18 MUI: A component is changing the uncontrolled value state of Select to be controlled. Elements should not switch from uncontrolled to controlled (or vice versa).Decide between using a controlled or uncontrolled Select element for the lifetime of the component. The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.

const SelectInputField = ({ label, options, ...props }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <StyledSelect {...props}>
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default SelectInputField;
