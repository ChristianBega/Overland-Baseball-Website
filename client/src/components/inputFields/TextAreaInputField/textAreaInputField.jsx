import { TextField } from "@mui/material";

const TextAreaInputField = ({ rows = 3, cols = 30, resize = "vertical", ...props }) => {
  // const { cssProps } = props;
  // const theme = useTheme();
  return (
    <>
      {/* <InputLabel sx={{ ...cssProps, fontSize: "14px", marginBottom: "4px" }} htmlFor={props.name}>
        {props.label}
      </InputLabel> */}
      <TextField multiline style={{ resize }} id={props.name} rows={rows} cols={cols} {...props} />
      {/* {props.helperText && <Typography sx={{ color: "red", fontSize: "0.75rem", marginTop: "3px", display: "block" }}>{props.helperText}</Typography>} */}
    </>
  );
};

export default TextAreaInputField;
