import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { CmsBulkActionContext } from "../../../../../setup/context/cmsBulkActions.context";
import { bulkDeleteFromFirebase } from "../../../../../setup/utils/firebase/deleteItem";
import FormStatusIndicator from "../../../../../components/statusIndicators/formStatusIndicator";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";

const DeleteItemsForm = ({ ...props }) => {
  const { cmsItemType, uid, role, closeModal, selectedItems, setSelectedItems } = props;
  // const { setStatus, status, setProgress } = useContext(CmsBulkActionContext);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  // console.log("selectedItems line 11 - deleteItemsForm", selectedItems);
  const [inputValueConfirmDelete, setInputValueConfirmDelete] = useState("");

  const confirmDeleteIsTrue = inputValueConfirmDelete === "Confirm Delete";
  const handleDeleteItems = async () => {
    if (!confirmDeleteIsTrue) {
      setStatus("error");
      alert("Please type 'Confirm Delete' to delete, check the case sensitivity");
      return;
    }
    if (!window.confirm("Are you sure you want to delete these items? This action cannot be undone.")) {
      return;
    }
    setStatus("loading");
    try {
      const result = await bulkDeleteFromFirebase(uid, role, cmsItemType, selectedItems, setProgress);
      console.log("result line 27 - deleteItemsForm", result);
      if (result.success === true) {
        setStatus("success");
        setTimeout(() => {
          closeModal();
        }, 2000);
        setSelectedItems([]);
      }
    } catch (error) {
      setStatus("error");
      console.error("Error during bulk delete:", error);
      alert("Error during bulk delete. Check the console for more details.");
    }
  };
  const handleInputChange = (event) => {
    setInputValueConfirmDelete(event.target.value);
  };
  return (
    <Box component="form">
      <FormStatusIndicator status={status} progress={progress} />
      <p>Are you sure you want to delete the selected items?</p>
      <p style={{ color: "red" }}>Please type "Confirm Delete" to delete</p>
      <input type="text" value={inputValueConfirmDelete} onChange={handleInputChange} />

      <Button disabled={!confirmDeleteIsTrue} onClick={handleDeleteItems} variant="contained" color="secondary">
        Confirm Delete
      </Button>
    </Box>
  );
};

export default DeleteItemsForm;
