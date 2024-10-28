import { Box, Button } from "@mui/material";
import { StyledTableCell } from "../../../../../styles/index.styles";
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon } from "@mui/icons-material";
import { useContext } from "react";
import { CmsEditItemContext } from "../../../../../setup/context/cmsContext/cmsEdit.context";
import { UserContext } from "../../../../../setup/context/user.context";
const ActionButtonsCell = ({ isEditing, id, values, type }) => {
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const { handleStartEditing, handleCancelEditing, checkForEditChanges, cmsOperationStatus, handleSaveAndUpdateItem } =
    useContext(CmsEditItemContext);

  return (
    <StyledTableCell className="table-header-cell-narrow">
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {!isEditing && role === "admin" && (
          <Button
            disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
            onClick={() => handleStartEditing(id, values[0])}
            sx={{ border: "1px solid red", padding: 0 }}
            type="button"
            aria-label="edit item"
          >
            <EditIcon />
          </Button>
        )}
        {isEditing && (
          <>
            <Button
              disabled={!checkForEditChanges() || cmsOperationStatus.loading || cmsOperationStatus.success}
              onClick={() => handleSaveAndUpdateItem(type, id)}
              sx={{ border: "1px solid red", padding: 0 }}
              type="button"
              aria-label="save changes"
            >
              <SaveIcon />
            </Button>
            <Button
              disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
              onClick={handleCancelEditing}
              sx={{ border: "1px solid red", padding: 0 }}
              type="button"
              aria-label="cancel editing"
            >
              <CloseIcon />
            </Button>
          </>
        )}
      </Box>
    </StyledTableCell>
  );
};

export default ActionButtonsCell;
