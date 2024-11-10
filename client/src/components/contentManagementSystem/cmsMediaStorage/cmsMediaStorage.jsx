import { Button, Stack } from "@mui/material";
import { useState, useMemo } from "react";
import FilesGridView from "./components/filesGridView/filesGridView";
import FilesTableView from "./components/filesTableView/filesTableView";
import FileViewToggle from "./components/fileViewToggle/fileViewToggle";
import AddNewItem from "./components/addNewItem/addNewItem";
import { useModal } from "../../../setup/context/modal.context";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import InputFieldComponent from "../../inputFields/inputFields";
import DirectoryExplorer from "./components/directoryExplorer/directoryExplorer";
const CmsMediaStorage = () => {
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
      <Stack alignItems={"center"} direction="row" justifyContent="space-between">
        <h2>Media Storage</h2>
        <Button onClick={closeModal}>X</Button>
      </Stack>
      <AddNewItem />
      <Stack sx={{ marginBlock: "2rem" }} direction="row" spacing={2} alignItems="center">
        <div style={{ width: "100%" }}>
          <InputFieldComponent
            disabled
            type="text"
            placeholder="Search here..."
            sx={{
              width: "100%",
              border: "1px dotted red",
            }}
          />
        </div>
        <FileViewToggle currentView={viewMode} onViewChange={setViewMode} />
      </Stack>
      <DirectoryExplorer selectedSubDirectory={selectedSubDirectory} setSelectedSubDirectory={setSelectedSubDirectory} />
      {viewMode === "grid" ? <FilesGridView {...fileViewProps} /> : <FilesTableView {...fileViewProps} />}
    </div>
  );
};

export default CmsMediaStorage;
