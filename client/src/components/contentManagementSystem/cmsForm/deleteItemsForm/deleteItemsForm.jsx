import { Box, Button, TableRow } from "@mui/material";
import React, { useState } from "react";
import { bulkDeleteFromFirebase, bulkDeleteItemsFromStorage } from "../../../../setup/utils/firebase/deleteItem";
import FormStatusIndicator from "../../../statusIndicators/formStatusIndicator";
import InputFieldComponent from "../../../inputFields/inputFields";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { StyledTableCell } from "../../../../styles/index.styles";
import { styled } from "@mui/material/styles";

//! Add column width configurations
//! use the key name from any object being mapped over in the table
const columnConfigs = {
  eventImage: { width: "150px", maxLines: 1 },
  title: { width: "120px", maxLines: 1 },
  location: { width: "100px", maxLines: 1 },
  description: { width: "200px", maxLines: 2 },
  eventType: { width: "100px", maxLines: 1 },
  name: { width: "200px", maxLines: 2 },
};

const DynamicTableCell = styled(StyledTableCell)(({ columnKey }) => ({
  width: columnConfigs[columnKey]?.width || "120px",
  maxWidth: columnConfigs[columnKey]?.width || "120px",
  "& .cell-content": {
    display: "-webkit-box",
    WebkitLineClamp: columnConfigs[columnKey]?.maxLines || 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: "1.2em",
  },
}));

const DeleteItemsForm = ({ ...props }) => {
  const { cmsItemType, uid, role, closeModal, selectedItems, setSelectedItems } = props;
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [progress, setProgress] = useState(0);
  const [inputValueConfirmDelete, setInputValueConfirmDelete] = useState("");
  const confirmDeleteIsTrue = inputValueConfirmDelete === "Confirm Delete";

  const handleDeleteItems = async () => {
    if (!confirmDeleteIsTrue) {
      setStatusMessage("Please type 'Confirm Delete' to delete, check the case sensitivity");
      return;
    }
    if (!window.confirm("Are you sure you want to delete these items? This action cannot be undone.")) {
      return;
    }
    setStatusMessage("Loading...");
    // Filter out the ids from selectedItems
    const itemIdsToDelete = selectedItems.map((item) => item.id);
    const fileNamesToDelete = selectedItems.map((item) => item.fileName);

    try {
      // const result = await bulkDeleteFromFirebase(uid, role, cmsItemType, itemIdsToDelete, setProgress);
      // if (result.success === true) {
      //   setStatusMessage(result.message);
      //   setTimeout(() => {
      //     closeModal();
      //   }, 2000);
      //   setSelectedItems([]);
      // }
      const deletePromises = [bulkDeleteFromFirebase(uid, role, cmsItemType, itemIdsToDelete, setProgress)];

      // Conditionally add the storage deletion promise
      if (cmsItemType === "documents" || cmsItemType === "mediaStorage") {
        deletePromises.push(bulkDeleteItemsFromStorage(uid, role, fileNamesToDelete, cmsItemType));
      }

      const results = await Promise.all(deletePromises);

      const allSuccess = results.every((result) => result.success);
      if (allSuccess) {
        setStatusMessage("Items deleted successfully");
        setStatusCode(200);
        setTimeout(() => {
          closeModal();
        }, 2000);
        setSelectedItems([]);
      } else {
        setStatusMessage("Error during deletion. Check the console for more details.");
        setStatusCode(400);
      }
    } catch (error) {
      setStatusMessage("Error during bulk delete. Check the console for more details.");
      setStatusCode(400);
      console.error("Error during bulk delete:", error);
      alert("Error during bulk delete. Check the console for more details.");
    }
  };
  const handleInputChange = (event) => {
    setInputValueConfirmDelete(event.target.value);
  };
  const allKeys = Array.from(new Set(selectedItems.flatMap((item) => Object.keys(item))));

  // Filter out unwanted keys and nested objects
  const filteredKeys = allKeys.filter((key) => {
    // Skip standard unwanted keys and check for nested objects
    if (
      ["createdAt", "addedByUserUid", "createdByUserUid", "id", "seasons.summer.active", "seasons.spring.active", "seasons.fall.active"].includes(key)
    ) {
      return false;
    }
    const sampleValue = selectedItems[0]?.[key];
    return typeof sampleValue !== "object" || sampleValue === null;
  });

  return (
    <Box component="form">
      <FormStatusIndicator
        statusMessage={statusMessage}
        statusCode={statusCode}
        loading={statusMessage === "Loading..."}
        error={statusMessage && statusMessage === "Error during deletion. Check the console for more details."}
      />
      {/* <FormStatusIndicator statusMessage={statusMessage} progress={progress} /> */}
      <p>Are you sure you want to delete the selected items?</p>
      <TableContainer sx={{ maxHeight: "400px", overflow: "auto", marginBlock: "2rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              {filteredKeys.map((key) => (
                <DynamicTableCell isCmsItem={true} className="table-header-cell table-header-cell-narrow" key={key} columnKey={key}>
                  <p>{key}</p>
                </DynamicTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItems.map((row, index) => (
              <TableRow key={index}>
                {filteredKeys.map((key) => (
                  <DynamicTableCell isCmsItem={true} className="table-cell" columnKey={key} key={key}>
                    <div className="cell-content">{row[key] || ""}</div>
                  </DynamicTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <InputFieldComponent
        type="text"
        placeholder=" Type 'Confirm Delete' here..."
        value={inputValueConfirmDelete}
        onChange={handleInputChange}
        label="Confirm Delete"
      />
      <Button
        sx={{ marginTop: "2rem" }}
        disabled={!confirmDeleteIsTrue}
        onClick={handleDeleteItems}
        variant="contained"
        color="secondary"
        id={`confirm-delete-${cmsItemType}-button`}
        aria-label={`confirm delete ${cmsItemType} button`}
      >
        Confirm Delete
      </Button>
    </Box>
  );
};

export default DeleteItemsForm;
