import { Button } from "@mui/material";
import { useModal } from "../../../../../setup/context/modal.context";
import { useUrlQueryParams } from "../../../../../setup/utils/helpers/useUrlQueryParams";
import CmsForm from "../../../contentManagementSystem/cmsForm/cmsForm";

const DashboardOptions = () => {
  // const [currentSelectedOption, setCurrentSelectedOption] = useState(null);
  const { openModal } = useModal();
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");

  const handleCreate = () => {
    // setCurrentSelectedOption("create");
    openModal(<CmsForm formType="create" />);
  };

  const handleBulkAdd = () => {
    // setCurrentSelectedOption("bulkAdd");
    openModal(<CmsForm formType="bulkAdd" />);
  };

  const handleDelete = () => {
    // setCurrentSelectedOption("delete");
    openModal(<CmsForm formType="delete" />);
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button onClick={handleCreate} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}>Create</span>
      </Button>
      <Button onClick={handleBulkAdd} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}>Bulk Add </span>
      </Button>
      <Button onClick={handleDelete} sx={{ width: "100px", padding: "0rem" }}>
        <span style={{ fontSize: "12px" }}> Delete</span>
      </Button>
    </div>
  );
};

export default DashboardOptions;
