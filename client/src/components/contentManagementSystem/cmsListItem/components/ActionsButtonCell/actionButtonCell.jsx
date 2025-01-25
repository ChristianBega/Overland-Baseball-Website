// MUI
import { Box, Button } from "@mui/material";
// Styles
import { StyledTableCell } from "../../../../../styles/index.styles";
// Icons
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon } from "@mui/icons-material";
// Context
import { useContext } from "react";
import { CmsEditItemContext } from "../../../../../setup/context/cmsContext/cmsEdit.context";
import { UserContext } from "../../../../../setup/context/user.context";
import { useModal } from "../../../../../setup/context/modal.context";
// Components
import CmsForm from "../../../cmsForm/cmsForm";
// Utils
import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";
// Hooks
import { useUrlQueryParams } from "../../../../../setup/utils/helpers/useUrlQueryParams";
const ActionButtonsCell = ({ isEditing, id, values, type }) => {
  const { isMd } = useMediaQueries();
  const { openModal, closeModal } = useModal();
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const { handleStartEditing, handleCancelEditing, checkForEditChanges, cmsOperationStatus, handleSaveAndUpdateItem, uploadType } =
    useContext(CmsEditItemContext);
  const isEditingNew = isEditing && isMd;

  let queryParams = useUrlQueryParams();
  let uid = queryParams.get("uid");

  const handleMobileStartEditing = (id, values) => {
    const props = {
      cmsItemType: type,
      role: role,
      uid: uid,
      editableItemData: values,
      closeModal: handleMobileCancelEditing,
    };

    handleStartEditing(id, values[0]);
    openModal(<CmsForm formType="edit" {...props} />, "cmsFormEditMobile", handleMobileCancelEditing);
  };

  const handleMobileCancelEditing = () => {
    handleCancelEditing();
    closeModal();
  };

  return (
    <StyledTableCell className="table-header-cell-narrow" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {!isEditingNew && (role === "admin" || role === "coach") && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
            onClick={isMd ? () => handleStartEditing(id, values[0]) : () => handleMobileStartEditing(id, values[0])}
            type="button"
            aria-label="edit item"
          >
            <EditIcon />
          </Button>
        )}
        {isEditingNew && (
          <>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              disabled={!checkForEditChanges() || cmsOperationStatus.loading || cmsOperationStatus.success}
              onClick={() => handleSaveAndUpdateItem(type, id, uploadType)}
              type="button"
              aria-label="save changes"
            >
              <SaveIcon />
            </Button>
            <Button
              disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
              onClick={handleCancelEditing}
              variant="contained"
              color="secondary"
              size="small"
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
