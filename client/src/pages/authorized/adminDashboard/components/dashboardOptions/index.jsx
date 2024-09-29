import { Button } from "@mui/material";
import { useModal } from "../../../../../setup/context/modal.context";
import { useUrlQueryParams } from "../../../../../setup/utils/helpers/useUrlQueryParams";
import CmsForm from "../../../contentManagementSystem/cmsForm/cmsForm";
import { CmsBulkActionContext } from "../../../../../setup/context/cmsBulkActions.context";
import { useContext } from "react";

const DashboardOptions = () => {
  const { openModal, closeModal } = useModal();
  const { selectedItems, setSelectedItems, selectAll } = useContext(CmsBulkActionContext);
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
    event.preventDefault();
    event.stopPropagation();
    openModal(<CmsForm formType="create" {...props} />);
  };

  const handleBulkAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openModal(<CmsForm formType="bulkAdd" {...props} />);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openModal(<CmsForm formType="delete" {...props} />);
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button onClick={handleCreate} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}>Create</span>
      </Button>
      <Button onClick={handleBulkAdd} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}>Bulk Add </span>
      </Button>
      <Button disabled={selectedItems.length === 0} onClick={handleDelete} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}> Delete</span>
      </Button>
    </div>
  );
};

export default DashboardOptions;
