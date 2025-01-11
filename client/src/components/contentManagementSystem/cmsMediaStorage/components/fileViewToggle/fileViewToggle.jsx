import { Button, Stack } from "@mui/material";
import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const FileViewToggle = ({ currentView, onViewChange }) => {
  return (
    <Stack direction="row">
      <Button
        aria-label="grid view"
        sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        variant="contained"
        size="medium"
        id="grid-view-button"
        color="secondary"
        onClick={() => onViewChange("grid")}
        disabled={currentView === "grid"}
      >
        <GridViewIcon />
      </Button>

      <Button
        aria-label="list view"
        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        variant="contained"
        size="medium"
        color="secondary"
        id="list-view-button"
        onClick={() => onViewChange("list")}
        disabled={currentView === "list"}
      >
        <FormatListBulletedIcon />
      </Button>
    </Stack>
  );
};

export default FileViewToggle;
