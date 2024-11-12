import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import InputFieldComponent from "../../inputFields/inputFields";
import { CmsEditItemContext } from "../../../setup/context/cmsContext/cmsEdit.context";
import { useRealtimeData } from "../../../hooks/useRealtimeData";

// & Im going to want to write down some context information on why we use localUploadType and contextUploadType.....
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

const CmsUploadItem = ({
  onChange,
  value,
  placeholderTextfield,
  label,
  cmsItemType,
  parentElement,
  localUploadType = "url",
  setLocalUploadType,
  cmsUploadName,
}) => {
  // const [localUploadType, setLocalUploadType] = useState("url");
  const { uploadType: contextUploadType, setUploadType: setContextUploadType } = useContext(CmsEditItemContext);
  const { data: displayData, isLoading, error } = useRealtimeData(cmsItemType);

  // Determine which uploadType to use
  const uploadType = parentElement === "addItemsForm" ? localUploadType : contextUploadType;
  const setUploadType = parentElement === "addItemsForm" ? setLocalUploadType : setContextUploadType;

  const handleChangeTest = (field) => (event) => {
    onChange(event.target.files[0]);
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
          <AddIcon sx={{ fontSize: 16, color: "white" }} />
          <Typography sx={{ fontSize: 12, color: "white" }}>New Url</Typography>
        </Button>
        <Button
          type="button"
          aria-label="new file"
          className={`right-btn ${uploadType === "file" ? "isActive" : "isInactive"}`}
          sx={{ ...ButtonStyles }}
          onClick={() => setUploadType("file")}
        >
          <AddIcon sx={{ fontSize: 16, color: "white" }} />
          <Typography sx={{ fontSize: 12, color: "white" }}>New File</Typography>
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
        <InputFieldComponent
          onChange={localUploadType === "file" ? handleChangeTest(cmsUploadName) : onChange}
          value={value}
          placeholder={placeholderTextfield}
          label={`${label} File`}
          type="file"
          cmsUploadItem={true}
        />
      )}
    </>
  );
};

export default CmsUploadItem;
