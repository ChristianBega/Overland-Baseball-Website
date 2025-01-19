import { Box, Button } from "@mui/material";
import { StyledTableCell } from "../../../../../styles/index.styles";
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon } from "@mui/icons-material";
import { useContext } from "react";
import { CmsEditItemContext } from "../../../../../setup/context/cmsContext/cmsEdit.context";
import { UserContext } from "../../../../../setup/context/user.context";
import CmsForm from "../../../cmsForm/cmsForm";
import { useModal } from "../../../../../setup/context/modal.context";
// import { CmsBulkActionContext } from "../../../../../setup/context/cmsContext/cmsBulkActions.context";
import { useUrlQueryParams } from "../../../../../setup/utils/helpers/useUrlQueryParams";
import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";
const ActionButtonsCell = ({ isEditing, id, values, type }) => {
  const { isLg, isMd } = useMediaQueries();
  const { openModal, closeModal } = useModal();
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const { handleStartEditing, handleCancelEditing, checkForEditChanges, cmsOperationStatus, handleSaveAndUpdateItem, uploadType } =
    useContext(CmsEditItemContext);
  // const { selectedItems, setSelectedItems, selectAll } = useContext(CmsBulkActionContext);
  const isEditingNew = isEditing && isMd;

  let queryParams = useUrlQueryParams();
  let uid = queryParams.get("uid");

  const handleMobileStartEditing = (id, values) => {
    const props = {
      cmsItemType: type,
      role: role,
      uid: uid,
      closeModal: handleMobileCancelEditing,
      // selectedItems: selectedItems,
      // setSelectedItems: setSelectedItems,
      // saveAndUpdateItem: handleSaveAndUpdateItem,
      // cmsOperationStatus: cmsOperationStatus,
      // uploadType: uploadType,
      // handleChange: handleFieldChange,
    };
    //! cmsEdit.context does not work outside of the admin dashboard, the modal provider lies outside of the admin dashboard, so when we pass the cmsEdit content to the Modal, it does not access the context properly....
    // easiest solution is to create a local state to replace the cmsEdit.context????
    handleStartEditing(id, values[0]);
    openModal(<CmsForm formType="edit" {...props} />, "cmsFormEditMobile");
  };

  const handleMobileCancelEditing = () => {
    closeModal();
    handleCancelEditing();
  };

  // TODO: we need to add logic for when a user clicks out of the modal to do the same as the handleMobileCancelEditing. right now if i click off the modal the modal never closes and handleCancelEditing is never called. Which results in the user being stuck in edit mode.

  return (
    <StyledTableCell className="table-header-cell-narrow">
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
