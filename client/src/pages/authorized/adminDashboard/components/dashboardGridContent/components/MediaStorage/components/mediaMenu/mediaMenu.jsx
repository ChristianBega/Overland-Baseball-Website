import { Menu, MenuItem, Typography } from "@mui/material";

const MediaMenu = ({ anchorEl, open, handleClose, handleAddNewMediaItem, fileInputRef, handleMediaChange }) => {
  return (
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
      <MenuItem onClick={handleAddNewMediaItem}>
        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleMediaChange} accept="image/png, image/webp, image/jpeg" />
        <Typography component="span" fontSize="0.8rem">
          Upload File
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Typography component="span" fontSize="0.8rem">
          New Folder
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default MediaMenu;
