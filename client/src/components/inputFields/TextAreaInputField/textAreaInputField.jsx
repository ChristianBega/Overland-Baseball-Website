import { useTheme } from "@emotion/react";
import { InputLabel, Typography } from "@mui/material";

const defaultNumericStyles = {
  border: "1px solid red",
  // color: "#283F76",
  width: "100%",
  padding: "6px 8px",
  // margin: "0px",
  fontSize: "14px",
  // "&:hover": {
  //   cursor: "pointer",
  // },

  // "&::-webkit-calendar-picker-indicator": {
  //   opacity: 0.6,
  //   transition: "opacity 0.2s ease",
  // },
  // "&::-webkit-calendar-picker-indicator:hover": {
  //   opacity: 1,
  // },
};

const TextAreaInputField = ({ rows = 3, cols = 30, resize = "vertical", ...props }) => {
  const { cssProps } = props;
  const theme = useTheme();
  return (
    <>
      <InputLabel sx={{ ...cssProps, fontSize: "14px", marginBottom: "4px" }} htmlFor={props.name}>
        {props.label}
      </InputLabel>
      <textarea style={{ ...defaultNumericStyles, resize, minHeight: "100px" }} id={props.name} rows={rows} cols={cols} {...props} />
      {props.helperText && <Typography sx={{ color: "red", fontSize: "0.75rem", marginTop: "3px", display: "block" }}>{props.helperText}</Typography>}
    </>
  );
};

export default TextAreaInputField;
