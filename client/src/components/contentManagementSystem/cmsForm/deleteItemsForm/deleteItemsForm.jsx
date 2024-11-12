import { Box, Button, TableRow } from "@mui/material";
import React, { useState } from "react";
import { bulkDeleteFromFirebase, bulkDeleteItemsFromStorage } from "../../../../setup/utils/firebase/deleteItem";
import FormStatusIndicator from "../../../statusIndicators/formStatusIndicator";
import InputFieldComponent from "../../../inputFields/inputFields";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { StyledTableCell } from "../../../../styles/index.styles";

const DeleteItemsForm = ({ ...props }) => {
  const { cmsItemType, uid, role, closeModal, selectedItems, setSelectedItems } = props;
  const [statusMessage, setStatusMessage] = useState(null);
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
        setTimeout(() => {
          closeModal();
        }, 2000);
        setSelectedItems([]);
      } else {
        setStatusMessage("Error during deletion. Check the console for more details.");
      }
    } catch (error) {
      setStatusMessage("Error during bulk delete. Check the console for more details.");
      console.error("Error during bulk delete:", error);
      alert("Error during bulk delete. Check the console for more details.");
    }
  };
  const handleInputChange = (event) => {
    setInputValueConfirmDelete(event.target.value);
  };
  const allKeys = Array.from(new Set(selectedItems.flatMap((item) => Object.keys(item))));

  // Filter out unwanted keys
  const filteredKeys = allKeys.filter((key) => !["createdAt", "addedByUserUid", "createdByUserUid", "id"].includes(key));
  return (
    <Box component="form">
      <FormStatusIndicator statusMessage={statusMessage} progress={progress} />
      <p>Are you sure you want to delete the selected items?</p>
      <TableContainer sx={{ maxHeight: "400px", overflow: "auto", marginBlock: "2rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              {filteredKeys.map((key) => (
                <StyledTableCell isCmsItem={true} className="table-header-cell table-header-cell-narrow" key={key}>
                  <p>{key}</p>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render rows */}
            {selectedItems.map((row, index) => (
              <TableRow key={index}>
                {filteredKeys.map((key) => (
                  <StyledTableCell isCmsItem={true} className="table-cell" sx={{ maxWidth: "200px" }} key={key}>
                    {row[key] || ""}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p style={{ color: "red" }}>Please type "Confirm Delete" to delete</p>
      <InputFieldComponent type="text" placeholder=" Type 'Confirm Delete' here..." value={inputValueConfirmDelete} onChange={handleInputChange} />
      <Button sx={{ marginTop: "2rem" }} disabled={!confirmDeleteIsTrue} onClick={handleDeleteItems} variant="contained" color="primary">
        Confirm Delete
      </Button>
    </Box>
  );
};

export default DeleteItemsForm;
