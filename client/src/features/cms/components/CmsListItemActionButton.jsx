// MUI
import { Box, Button } from "@mui/material";
// Styles
import { StyledTableCell } from "../../ui/components/DataTable";
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
import { useUrlQueryParams } from "../../../utils/helpers/useUrlQueryParams";
import { StyledDataHeaderCell } from "../../roster/components/TeamRosterTableView.styles";
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
    // Todo: need to change to datatable styling
    <StyledDataHeaderCell>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {(role === "admin" || role === "coach") && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
            onClick={() => handleModalStartEditing(id, values[0])}
            type="button"
            aria-label="edit item"
            sx={{ ml: 1 }}
          >
            <EditIcon />
          </Button>
        )}
      </Box>
    </StyledDataHeaderCell>
  );
};

export default ActionButtonsCell;
