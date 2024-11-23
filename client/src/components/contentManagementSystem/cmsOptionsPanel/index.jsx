import { Button } from "@mui/material";
import CmsForm from "../cmsForm/cmsForm";
import { useContext } from "react";
import { useModal } from "../../../setup/context/modal.context";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { CmsBulkActionContext } from "../../../setup/context/cmsContext/cmsBulkActions.context";
import { CmsEditItemContext } from "../../../setup/context/cmsContext/cmsEdit.context";
import { useCheckAuthorization } from "../../../setup/utils/helpers/checkAuthorization";

const CmsOptionsPanel = () => {
  const { openModal, closeModal } = useModal();
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
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button disabled={editableItemData} onClick={handleCreate} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}>Create</span>
      </Button>
      <Button disabled={editableItemData} onClick={handleBulkAdd} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}>Bulk Add </span>
      </Button>
      <Button disabled={selectedItems.length === 0 || editableItemData} onClick={handleDelete} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}> Delete</span>
      </Button>
    </div>
  );
};

export default CmsOptionsPanel;