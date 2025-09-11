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
import { Typography } from "@mui/material";
// Components
import RosterTableItem from "../../../features/roster/components/RosterTableItem";
import ScheduleTableItem from "../../../features/home/components/ScheduleTableItem";
import EventsTableItem from "../../../features/events/components/EventsTableItem";
import DocumentCard from "../../../features/documents/components/DocumentCard";
import ActionButtonsCell from "./CmsListItemActionButton";
import CheckboxCell from "./CmsListItemCheckbox";
import DeleteButtonCell from "./CmsListItemDeleteButton";
// Contexts
import { CmsEditItemContext } from "../../../features/cms/context/CmsEdit.context";
import { UserContext } from "../../../features/auth/context/UserContext";
import { CmsBulkActionContext } from "../../../features/cms/context/CmsBulkActions.context";
// Utils & Helpers
import { useUrlQueryParams } from "../../../utils/helpers/useUrlQueryParams";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { StyledTableRow } from "../../ui/components/DataTable";

const CmsListItem = ({ values, id, section }) => {
  let queryParams = useUrlQueryParams();
  const { isMd } = useMediaQueries();
  let type = queryParams.get("type");
  const { currentUserProfile } = useContext(UserContext);
  const { editableItemId } = useContext(CmsEditItemContext);
  const { selectedItems } = useContext(CmsBulkActionContext);
  const { role } = currentUserProfile;
  const isEditing = editableItemId === id;
  const isItemSelected = selectedItems.some((item) => item.id === id);
  const isEditingNew = isEditing && isMd;
  const commonTableCellProps = {
    id: id,
    values: values,
    type: type,
  };

  const renderCmsItem = (section) => {
    if (!values || values.length === 0) {
      return <Typography>No content available</Typography>;
    }

    // Props for split table sections
    const props = {
      isCmsItem: true,
      section: section,
    };

    const cmsItemsMap = {
      schedule: values.map((value, index) => <ScheduleTableItem key={index + id} data={value} {...props} />),
      roster: values.map((value, index) => <RosterTableItem key={index + id} data={value} {...props} />),
      events: values.map((value, index) => <EventsTableItem key={index + id} data={value} {...props} />),
      documents: values.map((value, index) => <DocumentCard isCard={false} key={index + id} data={value} {...props} />),
    };
    return cmsItemsMap[type];
  };

  // For split tables, just return the content without wrapper
  if (section) {
    return renderCmsItem(section);
  }

  // Fallback for non-split tables (shouldn't be used in new implementation)
  return (
    <>
      {/* <StyledTableRow> */}
      <CheckboxCell isSelected={isItemSelected} {...commonTableCellProps} />
      {renderCmsItem()}
      <ActionButtonsCell {...commonTableCellProps} />
      {/* </StyledTableRow> */}
    </>
  );
};
export default CmsListItem;
