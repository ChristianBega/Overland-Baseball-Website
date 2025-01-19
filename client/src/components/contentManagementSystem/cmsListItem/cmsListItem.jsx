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
import React, { useContext } from "react";
// Mui
import { Typography, TableRow } from "@mui/material";
// Components
import TeamRoosterItem from "../../../pages/unauthorized/roster/components/teamRosterItem/teamRosterItem.component";
import ScheduleItem from "../../../pages/unauthorized/home/components/schedule/components/scheduleItem/scheduleItem.component";
import EventItems from "../../../pages/unauthorized/events/components/eventItems/eventItems.component";
import DocumentCard from "../../../pages/authorized/documents/components/documentCard/documentCard.component";
import ActionButtonsCell from "./components/ActionsButtonCell/actionButtonCell";
import CheckboxCell from "./components/CheckboxCell/checkboxCell";
import DeleteButtonCell from "./components/DeleteButtonCell/deleteButtonCell";
// Contexts
import { CmsEditItemContext } from "../../../setup/context/cmsContext/cmsEdit.context";
import { UserContext } from "../../../setup/context/user.context";
import { CmsBulkActionContext } from "../../../setup/context/cmsContext/cmsBulkActions.context";
// Utils & Helpers
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";

const CmsListItem = ({ values, id }) => {
  let queryParams = useUrlQueryParams();
  const { isLg } = useMediaQueries();
  let type = queryParams.get("type");
  const { currentUserProfile } = useContext(UserContext);
  const { editableItemId, editableItemData, handleFieldChange, cmsOperationStatus } = useContext(CmsEditItemContext);
  const { selectedItems } = useContext(CmsBulkActionContext);
  const { role } = currentUserProfile;
  const isEditing = editableItemId === id;
  const isItemSelected = selectedItems.some((item) => item.id === id);
  const isEditingNew = isEditing && isLg;
  const commonTableCellProps = {
    id: id,
    values: values,
    type: type,
  };

  const renderEditableCmsItem = () => {
    if (!values || values.length === 0) {
      return <Typography>No content available</Typography>;
    }
    const props = {
      isEditable: isEditing,
      editableData: editableItemData,
      handleChange: handleFieldChange,
      isLoading: isEditing && cmsOperationStatus.loading,
      isError: isEditing && cmsOperationStatus.error,
      isSuccess: isEditing && cmsOperationStatus.success,
      isCmsItem: true,
      renderAsRow: false,
    };
    const editableCmsItemsMap = {
      schedule: values.map((value, index) => <ScheduleItem key={index + id} data={value} {...props} />),
      roster: values.map((value, index) => <TeamRoosterItem key={index + id} data={value} {...props} />),
      events: values.map((value, index) => <EventItems key={index + id} data={value} {...props} />),
      documents: values.map((value, index) => <DocumentCard isCard={false} key={index + id} data={value} {...props} />),
    };
    return editableCmsItemsMap[type];
  };

  return (
    <>
      <TableRow sx={{ "&:nth-of-type(even)": { backgroundColor: "#f2f2f2" } }}>
        <CheckboxCell isSelected={isItemSelected} {...commonTableCellProps} />
        {isEditingNew && (role === "admin" || role === "coach") && <DeleteButtonCell {...commonTableCellProps} />}
        {renderEditableCmsItem()}

        <ActionButtonsCell isEditing={isEditing} {...commonTableCellProps} />
      </TableRow>
    </>
  );
};
export default CmsListItem;

{
  /* if i close the modal with the X, it resets the state, and rests the editableItemData. So if i keep clicking it doesnt prefill the data. meaning the state is never set for the editableItemData. */
}
{
  /* if i click off the modal and close it, thise doesn't reset the state, so when i reclick the edit button, it does prefill the data....  */
}
