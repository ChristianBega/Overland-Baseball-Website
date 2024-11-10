import { Button, Stack } from "@mui/material";
import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
const DirectoryExplorer = ({ selectedSubDirectory, setSelectedSubDirectory }) => {
  const directories = ["mediaStorage", "opponentIcon", "playerImage", "documents"];
  const handleSelectDirectory = (directory) => {
    setSelectedSubDirectory(directory);
  };
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ marginBlock: "2rem" }} gap={"2rem"}>
      <Button variant="outlined" color="primary" onClick={() => handleSelectDirectory("view all")}>
        View All
      </Button>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          maxWidth: "80%",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {directories.map((directory) => (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              border: selectedSubDirectory === directory ? "1px solid #000" : "1px solid transparent",
              padding: ".5rem .8rem",
              borderRadius: "8px",
              flex: "1",
              cursor: "pointer",
            }}
            onClick={() => handleSelectDirectory(directory)}
          >
            <FolderIcon />
            <p>{directory}</p>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default DirectoryExplorer;
