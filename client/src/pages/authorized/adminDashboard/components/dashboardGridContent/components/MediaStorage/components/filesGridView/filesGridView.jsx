import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const FilesGridView = ({ displayData, isLoading, error }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return ( 
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
      {displayData.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundImage: `url(${item.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px dotted red",
            padding: "1rem",
            marginBottom: "1rem",
            width: "150px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
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
            <MenuItem onClick={handleClose}>
              <Typography component="span" fontSize="0.8rem">
                Download
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography component="span" fontSize="0.8rem">
                Delete
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography component="span" fontSize="0.8rem">
                Rename
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography component="span" fontSize="0.8rem">
                Move to folder
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography component="span" fontSize="0.8rem">
                Get link
              </Typography>
            </MenuItem>
          </Menu>
          <p style={{ width: "100%", fontSize: "0.8rem", backgroundColor: "white", opacity: "0.8" }}>{item.fileName}</p>
        </div>
      ))}
    </div>
  );
};

export default FilesGridView;
