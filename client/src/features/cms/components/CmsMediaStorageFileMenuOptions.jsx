import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import { updateCMSItem } from "../utils/editItem";
import TextInputField from "../../../components/inputFields/TextInputField/textInputField";
import { getDownloadableUrl, handleUpdateImage } from "../utils/uploadFile";
import { UserContext } from "../../../features/auth/context/UserContext";
import { deleteCMSItem, deleteItemFromStorage } from "../utils/deleteItem";
import { useModal } from "../../../setup/context/modal.context";
// ! save rename function
export const handleSaveRename = async (uid, role, file, newFileName, originalFileExtension, closeModal, setAnchorEl, mainDirectoryName) => {
  const newFileNameWithExt = newFileName + "." + originalFileExtension;
  const originalFileNameWithExt = file.fileName;
  // console.log("file.sourceDirectory", file.sourceDirectory);
  // console.log("mainDirectoryName", mainDirectoryName);
  const renameResponse = await handleUpdateImage(uid, role, originalFileNameWithExt, newFileNameWithExt, file.sourceDirectory, mainDirectoryName);

  if (renameResponse.success) {
    const newFileData = {
      fileName: newFileName + "." + originalFileExtension,
      url: renameResponse.newDownloadURL,
    };
    const response = await updateCMSItem(uid, role, file.id, newFileData, file.sourceDirectory, mainDirectoryName);
    if (response.success) {
      alert("File renamed successfully");
      closeModal();
      setTimeout(() => {
        setAnchorEl(null);
      }, 100);
    } else {
      alert("Error renaming file");
    }
  }
};
// ! rename image component
const RenameImage = ({ file, closeModal, setAnchorEl }) => {
  const [newFileName, setNewFileName] = useState();
  const originalFileExtension = file.fileName.split(".")[1];
  const { currentUserProfile } = useContext(UserContext);
  const { role, uid } = currentUserProfile;

  const handleEditChange = (event) => {
    const { value } = event.target;
    setNewFileName(value);
  };

  const currentData = newFileName || file.fileName;

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Rename File</Typography>
        <Button onClick={closeModal}>X Cancel</Button>
      </Stack>
      <TextInputField type="text" label="New File Name" name="fileName" value={currentData.split(".")[0]} onChange={handleEditChange} />
      <Button onClick={() => handleSaveRename(uid, role, file, newFileName, originalFileExtension, closeModal, setAnchorEl, file.mainDirectory)}>
        Save
      </Button>
    </div>
  );
};

const FileMenuOptions = ({ file }) => {
  const { currentUserProfile } = useContext(UserContext);
  const { closeModal, openModal } = useModal();
  const { role, uid } = currentUserProfile;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = async (filePath, fileName) => {
    if (role !== "admin") return;
    if (!filePath || !fileName) return;
    try {
      const url = await getDownloadableUrl(filePath);

      // Proceed with downloading the file using the handleDownload logic
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data]);

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName || "downloaded_image.jpg");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      console.error("Error during download:", error);
    }
  };

  const handleDeleteItem = async () => {
    if (role !== "admin" && role !== "coach") return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteCMSItem(uid, role, file.id, file.sourceDirectory || file.mainDirectory);
      await deleteItemFromStorage(uid, role, file.url);
      alert("Item deleted successfully");
    }
    handleClose();
  };

  const handleEditClick = () => {
    openModal(<RenameImage file={file} closeModal={closeModal} setAnchorEl={setAnchorEl} />);
  };

  const handleMoveToFolder = () => {
    console.log("move to folder");
    handleClose();
  };

  const handleGetLink = async () => {
    try {
      await navigator.clipboard.writeText(file.url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link: ", err);
      alert("Failed to copy link. Please try again.");
    }
    handleClose();
  };

  return (
    <>
      <Button
        id="file-item-options-menu-button"
        aria-controls={open ? "file-item-options-menu-button" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: "grey",
          border: "none",
          cursor: "pointer",
          padding: ".5rem",
          margin: 0,
          minWidth: "0px",
        }}
      >
        <Stack direction="column" spacing={0.5}>
          <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
          <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
          <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
        </Stack>
      </Button>
      <Menu
        id="file-item-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "file-item-options-menu",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleDownload(file.url, file.fileName)}>
          <Typography component="span" fontSize="0.8rem">
            Download
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteItem}>
          <Typography component="span" fontSize="0.8rem">
            Delete
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleEditClick}>
          <Typography component="span" fontSize="0.8rem">
            Rename
          </Typography>
        </MenuItem>
        <MenuItem disabled onClick={handleMoveToFolder}>
          <Typography component="span" fontSize="0.8rem">
            Move to folder
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleGetLink}>
          <Typography component="span" fontSize="0.8rem">
            Get link
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default FileMenuOptions;
