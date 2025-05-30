import React from "react";
import { InputLabel } from "@mui/material";
// const StyledTextField = styled(TextField)(({ inputTextColor }) => ({
//   width: "100%",
//   ...(inputTextColor && { "& .MuiInputBase-input": { color: inputTextColor } }),
// }));

const FileInputField = ({ ...props }) => {
  const { label, cssProps, value, onChange, name, type, cmsUploadItem, ...rest } = props;

  const handleChangeTest = (event) => {
    onChange(event.target.files[0]);
  };

  return (
    <>
      <InputLabel sx={{ ...cssProps, fontSize: "14px" }} htmlFor={props.name}>
        {label}
      </InputLabel>
      <input type="file" {...rest} onChange={cmsUploadItem ? onChange : handleChangeTest} />
    </>
  );
};

export default FileInputField;
