import { useState, useMemo, useCallback } from "react";
// MUI
import { Button, Stack, Typography } from "@mui/material";
// Components
import FilesGridView from "./components/filesGridView/filesGridView";
import FilesTableView from "./components/filesTableView/filesTableView";
import FileViewToggle from "./components/fileViewToggle/fileViewToggle";
import AddNewItem from "./components/addNewItem/addNewItem";
import SearchFilterComponent from "../../reusableComponents/searchFilter/searchFilter";
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
  const [filteredData, setFilteredData] = useState([]);

  const { data: mediaStorageData = [], isLoading: mediaStorageLoading, error: mediaStorageError } = useRealtimeData("mediaStorage");
  const { data: scheduleData = [], isLoading: scheduleLoading, error: scheduleError } = useRealtimeData("opponentIcon");
  const { data: rosterData = [], isLoading: rosterLoading, error: rosterError } = useRealtimeData("playerImage");
  // const { data: documentsData = [], isLoading: documentsLoading, error: documentsError } = useRealtimeData("documents");
  const { data: eventImagesData = [], isLoading: eventImagesLoading, error: eventImagesError } = useRealtimeData("eventImages");

  const isLoading = mediaStorageLoading || scheduleLoading || rosterLoading || eventImagesLoading;
  const error = mediaStorageError || scheduleError || rosterError || eventImagesError;

  const currentDirectoryData = useMemo(() => {
    if (isLoading) return [];
    switch (selectedSubDirectory) {
      case "opponentIcon":
        return scheduleData;
      case "playerImage":
        return rosterData;
      case "mediaStorage":
        return mediaStorageData;
      case "eventImages":
        return eventImagesData;
      default:
        return [...mediaStorageData, ...scheduleData, ...rosterData];
    }
  }, [selectedSubDirectory, scheduleData, rosterData, mediaStorageData, eventImagesData, isLoading]);

  // Handle filtered data changes
  const handleFilteredDataChange = useCallback((newFilteredData) => {
    setFilteredData(newFilteredData);
  }, []);

  const directoryMap = {
    opponentIcon: "schedule",
    playerImage: "roster",
  };

  // Define filter fields and labels for the search component
  const filterFields = ["fileName", "fileType", "createdAt"];
  const customFieldLabels = {
    fileName: "File Name",
    fileType: "File Type",
    createdAt: "Upload Date",
  };

  const mainDirectoryName = directoryMap[selectedSubDirectory];
  const fileViewProps = {
    displayData: filteredData.length > 0 ? filteredData : currentDirectoryData,
    isLoading,
    error,
    selectedSubDirectory,
    mainDirectoryName,
  };

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
        <SearchFilterComponent
          data={currentDirectoryData || []}
          onFilteredDataChange={handleFilteredDataChange}
          filterFields={filterFields}
          customFieldLabels={customFieldLabels}
          placeholder="Search files..."
          sx={{ width: "100%" }}
        />
        <FileViewToggle currentView={viewMode} onViewChange={setViewMode} />
      </Stack>
      <DirectoryExplorer selectedSubDirectory={selectedSubDirectory} setSelectedSubDirectory={setSelectedSubDirectory} />
      {viewMode === "grid" ? <FilesGridView {...fileViewProps} /> : <FilesTableView {...fileViewProps} />}
    </div>
  );
};

export default CmsMediaStorage;
