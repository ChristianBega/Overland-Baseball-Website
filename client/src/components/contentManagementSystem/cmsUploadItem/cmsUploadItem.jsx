import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import InputFieldComponent from "../../inputFields/inputFields";
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
  return (
    // <Stack direction="column" spacing={2} sx={{ height: "112px", border: "1px solid red", display: "flex", justifyContent: "center" }}>
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
          disabled
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
      {uploadType && uploadType === "url" ? (
        <InputFieldComponent onChange={onChange} value={value} placeholder={placeholderTextfield} label={`${label} Url`} type="text" />
      ) : (
        <input type="file" />
      )}
    </>
    // </Stack>
  );
};

export default CmsUploadItem;
