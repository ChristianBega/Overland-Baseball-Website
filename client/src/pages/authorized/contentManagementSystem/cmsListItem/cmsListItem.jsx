import React, { useContext } from "react";
import { ListItem, Box, Button, Typography } from "@mui/material";
import { useUrlQueryParams } from "../../../../setup/utils/helpers/useUrlQueryParams";
import ScheduleItem from "../../../unauthorized/home/components/scheduleItem/scheduleItem.component";
import { CmsEditItemContext } from "../../../../setup/context/cmsEdit.context";
import { UserContext } from "../../../../setup/context/user.context";
import { deleteCMSItem } from "../../../../setup/utils/firebase/deleteItem";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";

const CmsListItem = ({ values, id }) => {
  const { currentUserProfile } = useContext(UserContext);
  const { editableItemId, editableItemData, startEditing, cancelEditing, checkForEditChanges, updateEditableItemData } =
    useContext(CmsEditItemContext);

  const isEditing = editableItemId === id;
  const queryParams = useUrlQueryParams();
  const type = queryParams.get("type");

  const handleDeleteItem = async () => {
    const { uid, role } = currentUserProfile;
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteCMSItem(uid, role, id, type);
    }
  };

  const handleEditClick = () => {
    let itemData = values;
    if (Array.isArray(itemData)) {
      itemData = itemData[0];
    }
    startEditing(id, itemData);
  };

  const handleUpdateItem = async () => {
    const { uid, role } = currentUserProfile;
    console.log("editableItemData", editableItemData);
    // await updateCMSItem(uid, role, id, editableItemData, type);
    // cancelEditing();

    // 1. compare the original item data with the editable item data and make a patch update?? Only update the fields that have changed.
    // 2. create error handling states to track firebase errors and display to the user.
    // 3. create loading states to track the loading state of the update item.
    // 4. create success states to track the success state of the update item.
    // 5. realtime updates to the cms list item so the user sees the changes as they happen.
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
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    updateEditableItemData(field, value);
  };

  const renderEditableCmsItem = () => {
    if (!values || values.length === 0) {
      return <Typography>No content available</Typography>;
    }

    switch (type?.toLowerCase()) {
      case "schedule":
        return values.map((value, idx) => (
          <ScheduleItem key={idx} data={value} isEditable={isEditing} editableData={editableItemData} handleChange={handleChange} />
        ));
      // case "roster":
      //   return <EditableRosterItem data={values} isEditable={editableItems[id]} />;
      default:
        return <Typography>No content available</Typography>;
    }
  };

  return (
    <ListItem sx={{ display: "flex" }}>
      <input type="checkbox" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {isEditing && (
          <Button
            onClick={handleDeleteItem}
            color="error"
            sx={{ border: "1px solid red", height: "70px", padding: 0, backgroundColor: "red" }}
            type="button"
          >
            <DeleteIcon />
          </Button>
        )}
      </Box>

      {renderEditableCmsItem()}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {!isEditing && (
          <Button onClick={handleEditClick} sx={{ border: "1px solid red", padding: 0 }} type="button">
            <EditIcon />
          </Button>
        )}
        {isEditing && (
          <>
            <Button disabled={!checkForEditChanges()} onClick={handleUpdateItem} sx={{ border: "1px solid red", padding: 0 }} type="button">
              <SaveAsIcon />
            </Button>
            <Button onClick={cancelEditing} sx={{ border: "1px solid red", padding: 0 }} type="button">
              <CloseIcon />
            </Button>
          </>
        )}
      </Box>
    </ListItem>
  );
};

export default CmsListItem;
