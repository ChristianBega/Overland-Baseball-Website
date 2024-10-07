// //* 1. compare the original item data with the editable item data and make a patch update?? Only update the fields that have changed.
//* 2. create error handling states to track firebase errors and display to the user.
//* 3. create loading states to track the loading state of the update item.
//* 4. create success states to track the success state of the update item.
//* 5. realtime updates to the cms list item so the user sees the changes as they happen.
// 7. how to make sure only the admin can edit the cms? What additional security features do we need?

// Cms Input field component -
// 1. add form validation to the input fields to make sure the user has entered valid data.
// 2. add error handling to the input fields to make sure the user knows if they have entered invalid data.
// 3. add a loading state to the input fields to make sure the user knows that the data is being saved.
// 4. add a success message to the input fields to make sure the user knows that the data has been saved.
// 5. update styling for input fields with labels, etc

// Ideas for the future
// 1. add a preview of the changes before they are saved.
// 2. add a history of the changes to the item.
// 6. undo feature for the user to undo their changes. last for 30 seconds.

import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography, TableRow, TableCell } from "@mui/material";
import ScheduleItem from "../../../pages/unauthorized/home/components/scheduleItem/scheduleItem.component";
import { CmsEditItemContext } from "../../../setup/context/cmsEdit.context";
import { UserContext } from "../../../setup/context/user.context";
import { deleteCMSItem } from "../../../setup/utils/firebase/deleteItem";
import { updateCMSItem } from "../../../setup/utils/firebase/editItem";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import TeamRoosterItem from "../../../pages/unauthorized/roster/components/teamRosterItem/teamRosterItem.component";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { CmsBulkActionContext } from "../../../setup/context/cmsBulkActions.context";
import { useCheckAuthorization } from "../../../setup/utils/helpers/checkAuthorization";

const CmsListItem = ({ values, id }) => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  const checkAuthorization = useCheckAuthorization();
  // user context
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  // cms edit context
  const {
    editableItemId,
    editableItemData,
    startEditing,
    cancelEditing,
    checkForEditChanges,
    updateEditableItemData,
    cmsOperationStatus,
    setCmsOperationStatus,
  } = useContext(CmsEditItemContext);
  // cms bulk action context
  const { selectedItems, handleCheckboxChange } = useContext(CmsBulkActionContext);

  //! needs to be moved to cmsEdit.context
  const isEditing = editableItemId === id;
  const handleUpdateItem = async () => {
    if (!checkAuthorization(role)) return;
    setCmsOperationStatus({ type: "update cms", loading: true, error: null, success: false });

    try {
      const { uid } = currentUserProfile;
      await updateCMSItem(uid, role, id, editableItemData, type);
      setCmsOperationStatus({ type: "update", loading: false, error: null, success: true });

      setTimeout(() => {
        setCmsOperationStatus({ type: "update", loading: false, error: null, success: false });
        cancelEditing();
      }, 3000);
    } catch (error) {
      setCmsOperationStatus({ type: "update", loading: false, error: error.message, success: false });
    }
  };
  const handleDeleteItem = async () => {
    if (!checkAuthorization(role)) return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      const { uid } = currentUserProfile;
      await deleteCMSItem(uid, role, id, type);
      cancelEditing();
      // after you delete an item, it seems like i need to reset the state to because their is an alert preventing me from deleting the next item.
    }
  };
  const handleEditClick = () => {
    if (!checkAuthorization(role)) return;
    startEditing(id, values[0]);
  };
  const handleChange = (field) => (event) => {
    if (!checkAuthorization(role)) return;
    const value = event.target.value;
    updateEditableItemData(field, value);
  };
  //! needs to be moved to cmsEdit.context

  // Renders the editable fields during edit mode
  const renderEditableCmsItem = () => {
    if (!values || values.length === 0) {
      return <Typography>No content available</Typography>;
    }
    const props = {
      isEditable: isEditing,
      editableData: editableItemData,
      handleChange: handleChange,
      isLoading: isEditing && cmsOperationStatus.loading,
      isError: isEditing && cmsOperationStatus.error,
      isSuccess: isEditing && cmsOperationStatus.success,
    };

    const editableCmsItemsMap = {
      schedule: values.map((value, index) => <ScheduleItem key={index} data={value} renderAsRow={false} {...props} />),
      roster: values.map((value, index) => <TeamRoosterItem key={index} data={value} renderAsRow={true} {...props} />),
    };

    return editableCmsItemsMap[type];
  };

  const isItemSelected = selectedItems.some((item) => item.id === id);

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          {/* when i complete a bulk delete, the checkbox needs to be reset to unchecked */}
          <input
            disabled={cmsOperationStatus.loading || cmsOperationStatus.success || editableItemData}
            type="checkbox"
            checked={isItemSelected}
            onChange={() => handleCheckboxChange({ id, ...values[0] })}
          />
        </TableCell>
        {isEditing && role === "admin" && (
          <TableCell>
            <Button
              onClick={handleDeleteItem}
              color="error"
              sx={{ border: "1px solid red", height: "70px", padding: 0, backgroundColor: "red" }}
              type="button"
              disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
            >
              <DeleteIcon />
            </Button>
          </TableCell>
        )}
        <TableCell>{renderEditableCmsItem()}</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {!isEditing && role === "admin" && (
              <Button
                // if a user selects and item and it is not the current item they are editing, then the edit button should be disabled
                // disableEditButton
                disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
                onClick={handleEditClick}
                sx={{ border: "1px solid red", padding: 0 }}
                type="button"
              >
                <EditIcon />
              </Button>
            )}
            {isEditing && (
              <>
                <Button
                  disabled={!checkForEditChanges() || cmsOperationStatus.loading || cmsOperationStatus.success}
                  onClick={handleUpdateItem}
                  sx={{ border: "1px solid red", padding: 0 }}
                  type="button"
                >
                  <SaveAsIcon />
                </Button>
                <Button
                  disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
                  onClick={cancelEditing}
                  sx={{ border: "1px solid red", padding: 0 }}
                  type="button"
                >
                  <CloseIcon />
                </Button>
              </>
            )}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CmsListItem;
