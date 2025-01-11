import { useState, useMemo } from "react";
// MUI
import { Button, Stack, Typography } from "@mui/material";
// Components
import FilesGridView from "./components/filesGridView/filesGridView";
import FilesTableView from "./components/filesTableView/filesTableView";
import FileViewToggle from "./components/fileViewToggle/fileViewToggle";
import AddNewItem from "./components/addNewItem/addNewItem";
import InputFieldComponent from "../../inputFields/inputFields";
import DirectoryExplorer from "./components/directoryExplorer/directoryExplorer";
// Context
import { useModal } from "../../../setup/context/modal.context";
// Utils & Helpers
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";
// icons
import { Close as CloseIcon } from "@mui/icons-material";
const CmsMediaStorage = () => {
  const { isMd } = useMediaQueries();
  const { closeModal } = useModal();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSubDirectory, setSelectedSubDirectory] = useState("mediaStorage");
  const { data: mediaStorageData = [], isLoading: mediaStorageLoading, error: mediaStorageError } = useRealtimeData("mediaStorage");
  const { data: scheduleData = [], isLoading: scheduleLoading, error: scheduleError } = useRealtimeData("opponentIcon");
  const { data: rosterData = [], isLoading: rosterLoading, error: rosterError } = useRealtimeData("playerImage");
  const { data: documentsData = [], isLoading: documentsLoading, error: documentsError } = useRealtimeData("documents");

  const isLoading = mediaStorageLoading || scheduleLoading || rosterLoading || documentsLoading;
  const error = mediaStorageError || scheduleError || rosterError || documentsError;

  const currentDirectoryData = useMemo(() => {
    if (isLoading) return [];
    switch (selectedSubDirectory) {
      case "opponentIcon":
        return scheduleData;
      case "playerImage":
        return rosterData;
      case "documents":
        return documentsData;
      case "mediaStorage":
        return mediaStorageData;
      default:
        return [...mediaStorageData, ...scheduleData, ...rosterData, ...documentsData];
    }
  }, [selectedSubDirectory, scheduleData, rosterData, documentsData, mediaStorageData, isLoading]);
  const directoryMap = {
    opponentIcon: "schedule",
    playerImage: "roster",
  };
  const mainDirectoryName = directoryMap[selectedSubDirectory];
  const fileViewProps = { displayData: currentDirectoryData, isLoading, error, selectedSubDirectory, mainDirectoryName };

  return (
    <div id="media-storage-container" style={{ position: "relative", minHeight: "100vh" }}>
      <Stack alignItems={"center"} direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h2" component="h2" mb={0}>
          Media Storage
        </Typography>
        <Button
          aria-label="close media storage"
          id="close-media-storage-button"
          size="circle"
          color="secondary"
          variant="contained"
          onClick={closeModal}
        >
          <CloseIcon />
        </Button>
      </Stack>
      <AddNewItem />
      <Stack my={2} direction={isMd ? "row" : "column"} spacing={2} alignItems="space-between" justifyContent="space-between">
        <InputFieldComponent
          disabled
          type="text"
          placeholder="Search here..."
          sx={{
            width: "100%",
            border: "1px dotted red",
          }}
        />
        <FileViewToggle currentView={viewMode} onViewChange={setViewMode} />
      </Stack>
      <DirectoryExplorer selectedSubDirectory={selectedSubDirectory} setSelectedSubDirectory={setSelectedSubDirectory} />
      {viewMode === "grid" ? <FilesGridView {...fileViewProps} /> : <FilesTableView {...fileViewProps} />}
    </div>
  );
};

export default CmsMediaStorage;
