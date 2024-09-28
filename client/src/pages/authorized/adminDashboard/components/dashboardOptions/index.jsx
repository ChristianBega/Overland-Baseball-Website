import { Button } from "@mui/material";
import { useModal } from "../../../../../setup/context/modal.context";
import { useUrlQueryParams } from "../../../../../setup/utils/helpers/useUrlQueryParams";
import CmsForm from "../../../contentManagementSystem/cmsForm/cmsForm";
import { CmsBulkActionContext } from "../../../../../setup/context/cmsBulkActions.context";
import { useContext } from "react";

const DashboardOptions = () => {
  // const [currentSelectedOption, setCurrentSelectedOption] = useState(null);
  const { openModal, closeModal } = useModal();
  const { selectedItems, setSelectedItems } = useContext(CmsBulkActionContext);
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
  const handleCreate = () => {
    // setCurrentSelectedOption("create");
    openModal(<CmsForm formType="create" {...props} />);
  };

  const handleBulkAdd = () => {
    // setCurrentSelectedOption("bulkAdd");
    openModal(<CmsForm formType="bulkAdd" {...props} />);
  };

  const handleDelete = () => {
    // setCurrentSelectedOption("delete");
    openModal(<CmsForm formType="delete" {...props} />);
  };

  // 1. i need to track which listItems are selected - selectedListItems
  // 2. if selectedListItems length is 0, then disable delete button
  // 3. if selectedListItems length is >=1, then enable delete button
  // 4. when the delete button is clicked, open a modal to confirm the deletion of the selected listItems
  // 5. list the selected listItems in the modal and allow the user to remove listItems from the selection
  // 6. when the user confirms the deletion, delete the selected listItems by typing "Confirm Delete" in the modal and clicking confirm.

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
