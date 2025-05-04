// MUI
import { Box, Button } from "@mui/material";
// Styles
import { StyledTableCell } from "../../../styles/index.styles";
// Icons
import { Edit as EditIcon } from "@mui/icons-material";
// Context
import { useContext } from "react";
import { CmsEditItemContext } from "../../../features/cms/context/CmsEdit.context";
import { UserContext } from "../../../features/auth/context/UserContext";
import { useModal } from "../../../features/ui";
// Components
// import CmsForm from "../../../cmsForm/cmsForm";
import CmsForm from "../components/CmsForm";
// Hooks
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
const ActionButtonsCell = ({ id, values, type }) => {
  const { openModal, closeModal } = useModal();
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const { handleStartEditing, handleCancelEditing, cmsOperationStatus } = useContext(CmsEditItemContext);

  let queryParams = useUrlQueryParams();
  let uid = queryParams.get("uid");

  const handleModalStartEditing = (id, values) => {
    const props = {
      cmsItemType: type,
      role: role,
      uid: uid,
      editableItemData: values,
      closeModal: handleModalCancelEditing,
    };

    handleStartEditing(id, values[0]);
    openModal(<CmsForm formType="edit" {...props} />, "cmsFormEditMobile", handleModalCancelEditing);
  };

  const handleModalCancelEditing = () => {
    handleCancelEditing();
    closeModal();
  };

  return (
    <StyledTableCell className="table-header-cell-narrow" sx={{ padding: { xs: ".5rem .5rem .5rem 0", md: ".5rem 1rem" } }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {(role === "admin" || role === "coach") && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
            onClick={() => handleModalStartEditing(id, values[0])}
            type="button"
            aria-label="edit item"
          >
            <EditIcon />
          </Button>
        )}
      </Box>
    </StyledTableCell>
  );
};

export default ActionButtonsCell;
