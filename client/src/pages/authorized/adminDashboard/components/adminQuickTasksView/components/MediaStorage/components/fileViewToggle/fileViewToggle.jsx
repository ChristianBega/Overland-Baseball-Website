import { Button, Stack } from "@mui/material";
import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const FileViewToggle = ({ currentView, onViewChange }) => {
  return (
    <Stack direction="row">
      <Button
        sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        variant="contained"
        onClick={() => onViewChange("grid")}
        disabled={currentView === "grid"}
      >
        <GridViewIcon />
      </Button>

      <Button
        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        variant="contained"
        onClick={() => onViewChange("list")}
        disabled={currentView === "list"}
      >
        <FormatListBulletedIcon />
      </Button>
    </Stack>
  );
};

export default FileViewToggle;
