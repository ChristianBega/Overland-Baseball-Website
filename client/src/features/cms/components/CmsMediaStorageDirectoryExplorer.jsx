import React from "react";
// MUI
import { Button, Stack, Typography } from "@mui/material";
// Helpers
import { convertToTitleCase } from "../../../utils/helpers/convertText";
// Icons
import FolderIcon from "@mui/icons-material/Folder";
import { StyledDirectoryButton, StyledDirectoryButtonContainer } from "./CmsMediaStorageDirectoryExplorer.styles";

const DirectoryExplorer = ({ selectedSubDirectory, setSelectedSubDirectory }) => {
  const directories = ["mediaStorage", "opponentIcon", "playerImage", "eventImages"];
  const handleSelectDirectory = (directory) => {
    setSelectedSubDirectory(directory);
  };
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ marginBlock: "2rem" }} gap={"2rem"}>
      <Button variant="contained" color="secondary" id="view-all-button" aria-label="view all" onClick={() => handleSelectDirectory("view all")}>
        View All
      </Button>
      <StyledDirectoryButtonContainer direction="row" alignItems="center" justifyContent="center" spacing={2}>
        {directories.map((directory, index) => (
          <StyledDirectoryButton
            key={index}
            selectedSubDirectory={selectedSubDirectory}
            directory={directory}
            variant="outlined"
            color="secondary"
            id={`directory-button-${directory}`}
            aria-label={`directory-button-${directory}`}
            onClick={() => handleSelectDirectory(directory)}
          >
            <FolderIcon sx={{ fontSize: "1rem", marginRight: ".25rem" }} />
            <Typography variant="small">{convertToTitleCase(directory)}</Typography>
          </StyledDirectoryButton>
        ))}
      </StyledDirectoryButtonContainer>
    </Stack>
  );
};

export default DirectoryExplorer;
