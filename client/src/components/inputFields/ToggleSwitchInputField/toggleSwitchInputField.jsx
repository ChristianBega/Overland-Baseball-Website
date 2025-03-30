import { InputLabel, styled, Switch } from "@mui/material";
import React, { useState } from "react";

const StyledSwitch = styled(Switch)(({ switchColor }) => ({
  ...(switchColor && { "& .MuiSwitch-thumb": { color: switchColor } }),
}));

const ToggleSwitchInputField = ({ label, value, onChange, optionLabels, cssProps, ...rest }) => {
  const [localToggleState, setLocalToggleState] = useState(value);

  const handleChange = (event) => {
    setLocalToggleState(event.target.checked);
    onChange(event);
  };

  return (
    <>
      <InputLabel sx={{ ...cssProps, fontSize: "14px" }} htmlFor={rest.name}>
        {localToggleState ? optionLabels[1] : optionLabels[0]}
      </InputLabel>
      <StyledSwitch checked={value} onChange={handleChange} color="primary" inputProps={{ "aria-label": label }} {...rest} />
    </>
  );
};

export default ToggleSwitchInputField;
