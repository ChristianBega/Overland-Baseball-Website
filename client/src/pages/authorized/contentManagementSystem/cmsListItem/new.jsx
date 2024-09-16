// import React, { useContext } from "react";
// import { ListItem, Box, Typography, IconButton, Button } from "@mui/material";
// import { useUrlQueryParams } from "../../../../setup/utils/helpers/useUrlQueryParams";
// import ScheduleItem from "../../../unauthorized/home/components/scheduleItem/scheduleItem.component";
// import TeamRoosterItem from "../../../unauthorized/roster/components/teamRosterItem/teamRosterItem.component";
// import withEditableFields from "./components/editable";
// import { CmsEditItemContext, CmsEditItemProvider } from "../../../../setup/context/cmsEdit.context";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveAsIcon from "@mui/icons-material/SaveAs";
// import CloseIcon from "@mui/icons-material/Close";
// import { deleteCMSItem } from "../../../../setup/utils/firebase/deleteItem";
// import { UserContext } from "../../../../setup/context/user.context";
// import { updateCMSItem } from "../../../../setup/utils/firebase/editItem";

// const CmsListItem = ({ values, id }) => {
//   const { currentUserProfile } = useContext(UserContext);
//   const { editableItems, toggleEditMode, removeEditableItem } = useContext(CmsEditItemContext);
//   const queryParams = useUrlQueryParams();
//   const type = queryParams.get("type");

//   console.log(editableItems);

//   const renderEditableCmsItem = () => {
//     const EditableScheduleItem = withEditableFields(ScheduleItem);
//     const EditableRosterItem = withEditableFields(TeamRoosterItem);

//     if (!values || values.length === 0) {
//       return <Typography>No content available</Typography>;
//     }

//     switch (type?.toLowerCase()) {
//       case "schedule":
//         return values.map((value, idx) => <EditableScheduleItem key={idx} data={value} isEditable={editableItems[`${value.id}`]} />);
//       case "roster":
//         return <EditableRosterItem data={values} isEditable={editableItems[id]} />;
//       default:
//         return <Typography>No content available</Typography>;
//     }
//   };

//   const handleDeleteItem = async () => {
//     const { uid, role } = currentUserProfile;
//     // When you click delete, you should be redirected to a modal that asks you to confirm the deletion and you type CONFIRM OR DELETE to proceed, if you type CONFIRM, then the item is deleted, and the modal closes, and a success message is shown, if you type anything else, the modal closes and an error message is shown.
//     // deleteCMSItem(uid, role, id, type);
//   };

//   const handleUpdateItem = async () => {
//     const { uid, role } = currentUserProfile;
//     // updateCMSItem(userUid, role, id, data, type);
//   };

//   // Notes for how to handle edit mode - specifically a should user be able to edit multiple items at once? Or should we keep this to one item at a time?

//   return (
//     // <CmsEditItemProvider>
//     <ListItem
//       sx={{
//         display: "flex",
//       }}
//     >
//       <input type="checkbox" />
//       <Box sx={{ display: "flex", flexDirection: "column" }}>
//         {/* Save and cancel buttons */}
//         {editableItems[id] && (
//           <>
//             <Button
//               onClick={handleDeleteItem}
//               color="error"
//               sx={{ border: "1px solid red", height: "70px", padding: 0, backgroundColor: "red" }}
//               type="submit"
//             >
//               <DeleteIcon />
//             </Button>
//           </>
//         )}
//       </Box>
//       {renderEditableCmsItem()}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         {/* Edit button */}
//         {!editableItems[id] && (
//           <Button onClick={() => toggleEditMode(id)} sx={{ border: "1px solid red", padding: 0 }} type="submit">
//             <EditIcon />
//           </Button>
//         )}
//         {/* Save and cancel buttons */}
//         {editableItems[id] && (
//           <>
//             <Button sx={{ border: "1px solid red", padding: 0 }} type="submit">
//               <SaveAsIcon onClick={handleUpdateItem} />
//             </Button>
//             <Button onClick={() => removeEditableItem(id)} sx={{ border: "1px solid red", padding: 0 }}>
//               <CloseIcon />
//             </Button>
//           </>
//         )}
//       </Box>
//     </ListItem>
//     // </CmsEditItemProvider>
//   );
// };

// export default CmsListItem;

import React, { useContext } from "react";
import { ListItem, Box, Typography, Button } from "@mui/material";
import { useUrlQueryParams } from "../../../../setup/utils/helpers/useUrlQueryParams";
import ScheduleItem from "../../../unauthorized/home/components/scheduleItem/scheduleItem.component";
import TeamRoosterItem from "../../../unauthorized/roster/components/teamRosterItem/teamRosterItem.component";
import withEditableFields from "./components/editable";
import { CmsEditItemContext } from "../../../../setup/context/cmsEdit.context";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import { deleteCMSItem } from "../../../../setup/utils/firebase/deleteItem";
import { UserContext } from "../../../../setup/context/user.context";
import { updateCMSItem } from "../../../../setup/utils/firebase/editItem";

const CmsListItem = ({ values, id }) => {
  const { currentUserProfile } = useContext(UserContext);
  const { editableItems, toggleEditMode, removeEditableItem, editableData } = useContext(CmsEditItemContext);
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

  const handleDeleteItem = async () => {
    const { uid, role } = currentUserProfile;
    alert("Are you sure you want to delete this item?");
    deleteCMSItem(uid, role, id, type);
  };

  const handleUpdateItem = async () => {
    const { uid, role } = currentUserProfile;
  };
  console.log(editableData);

  return (
    <ListItem
      sx={{
        display: "flex",
      }}
    >
      <input type="checkbox" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {editableItems[id] && (
          <>
            <Button
              onClick={handleDeleteItem}
              color="error"
              sx={{ border: "1px solid red", height: "70px", padding: 0, backgroundColor: "red" }}
              type="submit"
            >
              <DeleteIcon />
            </Button>
          </>
        )}
      </Box>
      {renderEditableCmsItem()}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {!editableItems[id] && (
          <Button onClick={() => toggleEditMode(id)} sx={{ border: "1px solid red", padding: 0 }} type="submit">
            <EditIcon />
          </Button>
        )}
        {editableItems[id] && (
          <>
            <Button onClick={handleUpdateItem} sx={{ border: "1px solid red", padding: 0 }} type="submit">
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
