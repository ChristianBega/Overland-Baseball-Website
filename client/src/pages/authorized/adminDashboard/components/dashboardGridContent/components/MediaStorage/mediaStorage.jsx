import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useModal } from "../../../../../../../setup/context/modal.context";
import { useRealtimeData } from "../../../../../../../hooks/useRealtimeData";
import FilesGridView from "./components/filesGridView/filesGridView";
import FilesTableView from "./components/filesTableView/filesTableView";
import InputFieldComponent from "../../../../../../../components/inputFields/inputFields";
import FileViewToggle from "./components/fileViewToggle/fileViewToggle";
import AddNewItem from "./components/addNewItem/addNewItem";

const MediaStorage = () => {
  const { closeModal } = useModal();
  const { data: displayData, isLoading, error } = useRealtimeData("mediaStorage");
  const [viewMode, setViewMode] = useState("grid");

  const fileViewProps = { displayData, isLoading, error };
  return (
    <div id="media-storage-container" style={{ position: "relative", minHeight: "100vh" }}>
      <Stack alignItems={"center"} direction="row" justifyContent="space-between">
        <h2>Media Storage</h2>
        <Button onClick={closeModal}>X</Button>
      </Stack>
      {/* + new button for creating new file and folder (eventually folder) */}
      <AddNewItem />
      {/* search bar with filter options */}
      {/* grid view & list view toggle buttons  */}
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
      {/* files section that displays each file an options menu to delete, download, rename, move to folder, get link, etc...  */}
      {viewMode === "grid" ? <FilesGridView {...fileViewProps} /> : <FilesTableView {...fileViewProps} />}
      {/* pagination with previous and next buttons, and page number buttons  1-5, page selection dropdown, and total pages */}
    </div>
  );
};

export default MediaStorage;
