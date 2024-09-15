import React, { useContext } from "react";
import { ListItem, Box, Typography, IconButton, Button } from "@mui/material";
import { useUrlQueryParams } from "../../../../setup/utils/helpers/useUrlQueryParams";
import ScheduleItem from "../../../unauthorized/home/components/scheduleItem/scheduleItem.component";
import TeamRoosterItem from "../../../unauthorized/roster/components/teamRosterItem/teamRosterItem.component";
import withEditableFields from "./components/editable";
import { CmsEditItemContext } from "../../../../setup/context/cmsEdit.context";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";

const CmsListItem = ({ values, id }) => {
  const { editableItems, toggleEditMode, removeEditableItem } = useContext(CmsEditItemContext);
  const queryParams = useUrlQueryParams();
  const type = queryParams.get("type");

  const renderEditableCmsItem = () => {
    const EditableScheduleItem = withEditableFields(ScheduleItem);
    const EditableRosterItem = withEditableFields(TeamRoosterItem);

    if (!values || values.length === 0) {
      return <Typography>No content available</Typography>;
    }

    switch (type?.toLowerCase()) {
      case "schedule":
        return values.map((value, idx) => <EditableScheduleItem key={idx} data={value} isEditable={editableItems[`${value.id}`]} />);
      case "roster":
        return <EditableRosterItem data={values} isEditable={editableItems[id]} />;
      default:
        return <Typography>No content available</Typography>;
    }
  };

  return (
    <ListItem
      sx={{
        display: "flex",
      }}
    >
      <input type="checkbox" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Save and cancel buttons */}
        {editableItems[id] && (
          <>
            <Button color="error" sx={{ border: "1px solid red", height: "70px", padding: 0, backgroundColor: "red" }} type="submit">
              <DeleteIcon />
            </Button>
          </>
        )}
      </Box>
      {renderEditableCmsItem()}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Edit button */}
        {!editableItems[id] && (
          <Button onClick={() => toggleEditMode(id)} sx={{ border: "1px solid red", padding: 0 }} type="submit">
            <EditIcon />
          </Button>
        )}
        {/* Save and cancel buttons */}
        {editableItems[id] && (
          <>
            <Button sx={{ border: "1px solid red", padding: 0 }} type="submit">
              <SaveAsIcon />
            </Button>
            <Button onClick={() => removeEditableItem(id)} sx={{ border: "1px solid red", padding: 0 }}>
              <CloseIcon />
            </Button>
          </>
        )}
      </Box>
    </ListItem>
  );
};

export default CmsListItem;
