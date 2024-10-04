import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { getDownloadableUrl } from "../../../../../../../../../setup/utils/firebase/uploadImage";
import axios from "axios";
const FileMenuOptions = ({ file }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = async (filePath, fileName) => {
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
    } catch (error) {
      console.error("Error during download:", error);
    }
  };

  const handleDelete = () => {
    console.log("delete");

    handleClose();
  };
  const handleRename = () => {
    console.log("rename");
    handleClose();
  };
  const handleMoveToFolder = () => {
    console.log("move to folder");
    handleClose();
  };
  const handleGetLink = () => { 
    console.log("get link");
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
            {/* <a href={file.url} download>
              Download
            </a> */}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Typography component="span" fontSize="0.8rem">
            Delete
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleRename}>
          <Typography component="span" fontSize="0.8rem">
            Rename
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMoveToFolder}>
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
