import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { bulkDeleteFromFirebase } from "../../../../setup/utils/firebase/deleteItem";
import FormStatusIndicator from "../../../statusIndicators/formStatusIndicator";
import InputFieldComponent from "../../../inputFields/inputFields";

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
    try {
      const result = await bulkDeleteFromFirebase(uid, role, cmsItemType, itemIdsToDelete, setProgress);
      if (result.success === true) {
        setStatusMessage(result.message);
        setTimeout(() => {
          closeModal();
        }, 2000);
        setSelectedItems([]);
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
  return (
    <Box component="form">
      <FormStatusIndicator statusMessage={statusMessage} progress={progress} />
      <p>Are you sure you want to delete the selected items?</p>
      <p style={{ color: "red" }}>Please type "Confirm Delete" to delete</p>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {Object.keys(selectedItems[0] || {})
              .filter((key) => !["createdAt", "addedByUserUid", "id"].includes(key))
              .map((key) => (
                <th key={key}>
                  <p style={{ textAlign: "left" }}>{key}</p>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((row, index) => (
            <tr key={index}>
              {Object.entries(row)
                .filter(([key]) => !["createdAt", "addedByUserUid", "id"].includes(key))
                .map(([key, value], i) => (
                  <td key={i}>{value}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      <InputFieldComponent type="text" placeholder=" Type 'Confirm Delete' here..." value={inputValueConfirmDelete} onChange={handleInputChange} />

      <Button disabled={!confirmDeleteIsTrue} onClick={handleDeleteItems} variant="contained" color="primary">
        Confirm Delete
      </Button>
    </Box>
  );
};

export default DeleteItemsForm;
