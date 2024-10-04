import { Button } from "@mui/material";
import React, { useCallback, useContext, useRef, useState } from "react";
import { UserContext } from "../../../../../../../../../setup/context/user.context";
import { handleUploadImage } from "../../../../../../../../../setup/utils/firebase/uploadImage";
import { scrollTo } from "../../../../../../../../../setup/utils/helpers/scrollTo";
import MediaMenu from "../mediaMenu/mediaMenu";
import MediaPreviewManager from "../mediaPreviewManager/mediaPreviewManager";

const AddNewItem = () => {
  const { currentUserProfile } = useContext(UserContext);
  const { uid } = currentUserProfile;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);
  const fileInputRef = useRef(null);
  const [cancelUpload, setCancelUpload] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 100);
  };

  const handleAddNewMediaItem = () => {
    fileInputRef.current.click();
  };

  const handleMediaChange = (e) => {
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
      setTimeout(() => {
        scrollTo("#media-preview-manager");
      }, 100);
    }
    handleClose();
  };

  const handleUploadMedia = async () => {
    setStatusMessage("Loading...");
    setProgress(0);

    try {
      const response = await handleUploadImage(
        file,
        uid,
        (progress) => {
          setProgress(progress);
        },
        (cancelFn) => {
          setCancelUpload(() => cancelFn);
        }
      );
      if (response.success) {
        setStatusMessage(response.message);

        // Wait for 3 seconds before clearing the state
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setProgress(0);
        setFile(null);
        setPreview(null);
        setStatusMessage(null);
      } else {
        setStatusMessage(response.error);
        alert(response.error);
      }
    } catch (error) {
      console.error("error", error);
      setProgress(0);
      setStatusMessage(error.message);
    } finally {
      setCancelUpload(null);
    }
  };

  const handleCancelUpload = useCallback(() => {
    if (cancelUpload) {
      cancelUpload();
      setStatusMessage("Upload cancelled");
      setTimeout(() => {
        setProgress(0);
        setFile(null);
        setPreview(null);
        setStatusMessage(null);
        scrollTo("#media-storage-container");
      }, 100);
    }
  }, [cancelUpload]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginBlock: "2rem" }}>
      <Button id="add-new-media-item-button" onClick={handleClick} variant="contained">
        + New
      </Button>
      <MediaMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        handleAddNewMediaItem={handleAddNewMediaItem}
        fileInputRef={fileInputRef}
        handleMediaChange={handleMediaChange}
      />
      <MediaPreviewManager
        preview={preview}
        file={file}
        progress={progress}
        statusMessage={statusMessage}
        fileInputRef={fileInputRef}
        setPreview={setPreview}
        setFile={setFile}
        handleUploadMedia={handleUploadMedia}
        handleCancelUpload={handleCancelUpload}
        isUploading={!!cancelUpload}
      />
    </div>
  );
};

export default AddNewItem;
