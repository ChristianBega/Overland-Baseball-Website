import { useContext } from "react";
// Mui
import { Button, Stack, Typography } from "@mui/material";
// Components
import CmsForm from "../cmsForm/cmsForm";
// Context
import { useModal } from "../../../setup/context/modal.context";
import { CmsEditItemContext } from "../../../setup/context/cmsContext/cmsEdit.context";
import { CmsBulkActionContext } from "../../../setup/context/cmsContext/cmsBulkActions.context";
// Helpers & Utils
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { useCheckAuthorization } from "../../../setup/utils/helpers/checkAuthorization";
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";
// Icons
import PlusIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
const CmsOptionsPanel = () => {
  const { openModal, closeModal } = useModal();
  const { isMd } = useMediaQueries();
  const { selectedItems, setSelectedItems, selectAll } = useContext(CmsBulkActionContext);
  const { editableItemData } = useContext(CmsEditItemContext);
  const checkAuthorization = useCheckAuthorization();
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");
  const props = {
    cmsItemType: type,
    role: role,
    uid: uid,
    closeModal: closeModal,
    selectedItems: selectedItems,
    setSelectedItems: setSelectedItems,
  };
  const handleCreate = (event) => {
    if (!checkAuthorization(role)) return;
    event.preventDefault();
    event.stopPropagation();
    openModal(<CmsForm formType="create" {...props} />, "cmsFormCreate");
  };

  const handleBulkAdd = (event) => {
    if (!checkAuthorization(role)) return;
    event.preventDefault();
    event.stopPropagation();
    openModal(<CmsForm formType="bulkAdd" {...props} />, "cmsFormBulkAdd");
  };

  const handleDelete = (event) => {
    if (!checkAuthorization(role)) return;
    event.preventDefault();
    event.stopPropagation();
    openModal(<CmsForm formType="delete" {...props} />, "cmsFormBulkDelete");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        size={isMd ? "medium" : "small"}
        variant="contained"
        color="secondary"
        disabled={editableItemData}
        onClick={handleCreate}
        aria-label={`create ${type} button`}
        id={`cms-create-${type}-button`}
      >
        {isMd ? <Typography variant="small">Create</Typography> : <PlusIcon />}
      </Button>
      <Button
        size={isMd ? "medium" : "small"}
        variant="contained"
        color="secondary"
        disabled={editableItemData}
        onClick={handleBulkAdd}
        aria-label={`bulk add ${type} button`}
        id={`cms-bulk-add-${type}-button`}
      >
        {isMd ? <Typography variant="small">Bulk Add </Typography> : <UploadIcon />}
      </Button>
      <Button
        size={isMd ? "medium" : "small"}
        variant="contained"
        color="secondary"
        disabled={selectedItems.length === 0 || editableItemData}
        onClick={handleDelete}
        aria-label={`delete ${type} button`}
        id={`cms-delete-${type}-button`}
      >
        {isMd ? <Typography variant="small">Delete</Typography> : <DeleteIcon />}
      </Button>
    </Stack>
  );
};

export default CmsOptionsPanel;
