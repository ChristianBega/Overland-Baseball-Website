import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import InputFieldComponent from "../../inputFields/inputFields";
import FileInputField from "../../inputFields/FileInputField/fileInputField";

const ButtonStyles = {
  width: "100px",
  height: "25px",
  padding: 0,
  "&.left-btn": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  "&.right-btn": {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  "&.isActive": {
    backgroundColor: "green",
  },
  "&.isInactive": {
    backgroundColor: "grey",
  },
};

const CmsUploadItem = ({ onChange, value, placeholderTextfield, label }) => {
  const [uploadType, setUploadType] = useState("url");

  useEffect(() => {
    // Reset the value when the upload type changes
    onChange("");
  }, [uploadType]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file); // Pass the File object to the parent
  };

  return (
    <>
      <Stack direction="row" sx={{ height: "56px", alignItems: "center" }}>
        <Button
          type="button"
          aria-label="new url"
          className={`left-btn ${uploadType === "url" ? "isActive" : "isInactive"}`}
          sx={{ ...ButtonStyles }}
          onClick={() => setUploadType("url")}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: 12 }}>New Url</Typography>
        </Button>
        <Button
          type="button"
          aria-label="new file"
          className={`right-btn ${uploadType === "file" ? "isActive" : "isInactive"}`}
          sx={{ ...ButtonStyles }}
          onClick={() => setUploadType("file")}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: 12 }}>New File</Typography>
        </Button>
      </Stack>
      {uploadType === "url" ? (
        <InputFieldComponent onChange={onChange} value={value} placeholder={placeholderTextfield} label={`${label} Url`} type="text" />
      ) : (
        <InputFieldComponent onChange={handleFileChange} value={value} placeholder={placeholderTextfield} label={`${label} File`} type="file" />
      )}
    </>
  );
};

export default CmsUploadItem;
