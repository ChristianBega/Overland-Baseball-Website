import { Button, Modal, Box } from "@mui/material";
import { CmsCreateItemContext } from "../../../../../setup/context/cmsCreate.context";
import { useState, useContext } from "react";
import CMSCreateItemPage from "../../../contentManagementSystem/createPage";

const DashboardOptions = () => {
  const [currentSelectedOption, setCurrentSelectedOption] = useState(null); // this can be : create, bulkAdd, delete
  const { createItem } = useContext(CmsCreateItemContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  // const handleCreate = () => {
  //   const newItemData = { name: "New Item", description: "This is a new item" };
  //   createItem(newItemData);
  // };

  const handleCreate = () => {
    setCurrentSelectedOption("create");
    handleToggleModal();
  };

  const handleBulkAdd = () => {
    setCurrentSelectedOption("bulkAdd");
    handleToggleModal();
  };

  const handleDelete = () => {
    setCurrentSelectedOption("delete");
    handleToggleModal();
  };

  // When a user clicks on a button we set the state of currentSelectedOption to the button name

  // Each button will have its own handler that will set the state of currentSelectedOption to the button name & open the modal

  // Using the currentSelectedOption state we can determine which form to render in the modal

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button onClick={handleCreate} sx={{ width: "50px" }}>
          Create
        </Button>
        <Button onClick={handleBulkAdd} sx={{ width: "50px" }}>
          Bulk Add
        </Button>
        <Button onClick={handleDelete} sx={{ width: "50px" }}>
          Delete
        </Button>
      </div>
      <Modal open={isModalOpen} onClose={handleToggleModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {currentSelectedOption === "create" && <CMSCreateItemPage />}
          {currentSelectedOption === "bulkAdd" && <div>Bulk Add</div>}
          {currentSelectedOption === "delete" && <div>Delete</div>}
          {/* <CMSCreateItemPage /> */}
        </Box>
      </Modal>
    </>
  );
};

export default DashboardOptions;

// build a modal component that will render in different content passed to it.

// for the dashboard options we will pass the different forms to the modal component
