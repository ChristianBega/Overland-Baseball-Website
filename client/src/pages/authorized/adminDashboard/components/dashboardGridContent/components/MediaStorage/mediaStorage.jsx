import { Button, Stack } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useModal } from "../../../../../../../setup/context/modal.context";
import { UserContext } from "../../../../../../../setup/context/user.context";
import { handleUploadImage } from "../../../../../../../setup/utils/firebase/uploadImage";
import FormStatusIndicator from "../../../../../../../components/statusIndicators/formStatusIndicator";
import { useRealtimeData } from "../../../../../../../hooks/useRealtimeData";
import FilesGridView from "./components/filesGridView/filesGridView";
import FilesTableView from "./components/filesTableView/filesTableView";
import InputFieldComponent from "../../../../../../../components/inputFields/inputFields";
import FileViewToggle from "./components/fileViewToggle/fileViewToggle";

const MediaStorage = () => {
  const { preview, setPreview, closeModal, file, setFile } = useModal();
  const { data: displayData, isLoading, error } = useRealtimeData("mediaStorage");
  const fileInputRef = useRef(null);
  const { currentUserProfile } = useContext(UserContext);
  const { uid } = currentUserProfile;
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/webp", "image/jpeg"];
      const maxSizeInMB = 5;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (PNG, WEBP, JPEG).");
        fileInputRef.current.value = "";
        setFile(null);
        return;
      }

      if (file.size > maxSizeInBytes) {
        alert(`File size must be less than ${maxSizeInMB} MB.`);
        fileInputRef.current.value = "";
        setFile(null);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFile(file);
    }
  };

  const handleUploadEvent = async () => {
    setStatusMessage("Loading...");
    setProgress(0);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await handleUploadImage(file, uid, (progress) => {
        setProgress(progress);
      });
      if (response.success) {
        setStatusMessage(response.message);
        setTimeout(() => {
          // closeModal();
          setProgress(0);
          setFile(null);
          setPreview(null);
          fileInputRef.current.value = "";
          setStatusMessage(null);
        }, 2000);
      } else {
        setStatusMessage(response.error);
        alert(response.error);
      }
    } catch (error) {
      console.log("error", error);
      setProgress(0);
      setStatusMessage(error.message);
    }
  };

  const fileViewProps = { displayData, isLoading, error };
  return (
    <div>
      <Stack alignItems={"center"} direction="row" justifyContent="space-between">
        <h2>Media Storage</h2>
        <Button onClick={closeModal}>X</Button>
      </Stack>
      <form>
        <FormStatusIndicator progress={progress.toFixed()} statusMessage={statusMessage} />
        <Stack direction="row" spacing={2}>
          <Stack direction="column" gap={2}>
            <label htmlFor="upload-image">Upload New Image</label>
            <input ref={fileInputRef} type="file" id="upload-image" onChange={handleImageChange} accept="image/png, image/webp, image/jpeg" />
          </Stack>
          {preview ? (
            <Stack sx={{ width: "100px" }} direction="column" alignItems="center" justifyContent="space-between">
              <img src={preview} style={{ height: "100px", width: "100px" }} alt="Preview" />
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setPreview(null);
                  fileInputRef.current.value = "";
                }}
              >
                X
              </Button>
            </Stack>
          ) : null}
        </Stack>
        <Button onClick={handleUploadEvent} variant="contained" disabled={!preview}>
          Upload Image
        </Button>
      </form>

      {/* + new button for creating new file and folder (eventually folder) */}
      <Button variant="contained">+ New</Button>
      {/* search bar with filter options */}
      {/* grid view & list view toggle buttons  */}
      <Stack sx={{ border: "1px dotted red" }} direction="row" spacing={2} alignItems="center">
        <div style={{ width: "100%" }}>
          <InputFieldComponent
            type="text"
            placeholder="Search here..."
            sx={{
              width: "100%",
            }}
          />
        </div>
        <FileViewToggle currentView={viewMode} onViewChange={setViewMode} />
      </Stack>
    
      {/* files section that displays each file an options menu to delete, download, rename, move to folder, get link, etc...  */}
      {viewMode === "grid" ? <FilesGridView {...fileViewProps} /> : <FilesTableView {...fileViewProps} />}
      {/* pagination with previous and next buttons, and page number buttons  1-5, page selection dropdown, and total pages */}
    </div>
  );
};

export default MediaStorage;
