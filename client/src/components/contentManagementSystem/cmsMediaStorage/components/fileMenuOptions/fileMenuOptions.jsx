import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import { updateCMSItem } from "../../../../../setup/utils/firebase/editItem";
import TextInputField from "../../../../inputFields/TextInputField/textInputField";
import { getDownloadableUrl, handleUpdateImage } from "../../../../../setup/utils/firebase/uploadFile";
import { UserContext } from "../../../../../setup/context/user.context";
import { deleteCMSItem, deleteItemFromStorage } from "../../../../../setup/utils/firebase/deleteItem";
import { useModal } from "../../../../../setup/context/modal.context";
// ! save rename function
export const handleSaveRename = async (
  uid,
  role,
  file,
  newFileName,
  originalFileExtension,
  closeModal,
  setAnchorEl,
  subDirectoryName,
  mainDirectoryName
) => {
  const newFileNameWithExt = newFileName + "." + originalFileExtension;
  const originalFileNameWithExt = file.fileName;
  const renameResponse = await handleUpdateImage(uid, role, originalFileNameWithExt, newFileNameWithExt, subDirectoryName, mainDirectoryName);

  if (renameResponse.success) {
    const newFileData = {
      fileName: newFileName + "." + originalFileExtension,
      url: renameResponse.newDownloadURL,
    };
    const response = await updateCMSItem(uid, role, file.id, newFileData, subDirectoryName);
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
const RenameImage = ({ file, closeModal, setAnchorEl, selectedSubDirectory, mainDirectoryName }) => {
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
      <Button
        onClick={() =>
          handleSaveRename(uid, role, file, newFileName, originalFileExtension, closeModal, setAnchorEl, selectedSubDirectory, mainDirectoryName)
        }
      >
        Save
      </Button>
    </div>
  );
};

const FileMenuOptions = ({ file, selectedSubDirectory, mainDirectoryName }) => {
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
    if (role !== "admin") return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteCMSItem(uid, role, file.id, selectedSubDirectory);
      await deleteItemFromStorage(uid, role, file.url);
      alert("Item deleted successfully");
    }

    handleClose();
  };

  const handleEditClick = () => {
    openModal(
      <RenameImage
        file={file}
        closeModal={closeModal}
        setAnchorEl={setAnchorEl}
        selectedSubDirectory={selectedSubDirectory}
        mainDirectoryName={mainDirectoryName}
      />
    );
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
