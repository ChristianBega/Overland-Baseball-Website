import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import InputFieldComponent from "../../inputFields/inputFields";
import { CmsEditItemContext } from "../../../setup/context/cmsContext/cmsEdit.context";
import { useRealtimeData } from "../../../hooks/useRealtimeData";

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

const CmsUploadItem = ({ onChange, value, placeholderTextfield, label, cmsItemType }) => {
  // const [uploadType, setUploadType] = useState("url");
  const { uploadType, setUploadType } = useContext(CmsEditItemContext);
  const { data: displayData, isLoading, error } = useRealtimeData(cmsItemType);

  // useEffect(() => {
  //   // Reset the value when the upload type changes
  //   onChange("");
  // }, [uploadType]);

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
        <FormControl fullWidth>
          <InputLabel id="url-select-label">{`${label} Url`}</InputLabel>
          <Select labelId="url-select-label" value={value} label={`${label} Url`} onChange={onChange}>
            {displayData?.map((item) => (
              <MenuItem sx={{ color: "black" }} value={item.url} key={item.id}>
                {item.fileName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <InputFieldComponent onChange={onChange} value={value} placeholder={placeholderTextfield} label={`${label} File`} type="file" />
      )}
    </>
  );
};

export default CmsUploadItem;
