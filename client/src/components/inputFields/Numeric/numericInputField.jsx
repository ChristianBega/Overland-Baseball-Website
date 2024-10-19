import { InputLabel } from "@mui/material";

const defaultNumericStyles = {
  border: "1px solid red",
  // color: "#283F76",
  // width: "90%",
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

const NumericInputField = ({ ...props }) => {
  const { cssProps } = props;
  return (
    <>
      <InputLabel sx={{ ...cssProps, fontSize: "14px", marginBottom: "4px" }} htmlFor={props.name}>
        {props.label}
      </InputLabel>
      <input style={defaultNumericStyles} type="number" id={props.name} {...props} />
    </>
  );
};

export default NumericInputField;
