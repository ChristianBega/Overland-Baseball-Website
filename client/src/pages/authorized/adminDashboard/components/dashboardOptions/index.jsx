import { Button, Modal, Box } from "@mui/material";
import { CmsCreateItemContext, CmsCreateItemProvider } from "../../../../../setup/context/cmsCreate.context";
import { useState, useContext } from "react";
import CMSCreateItemPage from "../../../contentManagementSystem/createPage";

const DashboardOptions = () => {
  const { createItem } = useContext(CmsCreateItemContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOpenModal = () => setIsModalOpen(true);
  // const handleCloseModal = () => setIsModalOpen(false);
  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCreate = () => {
    const newItemData = { name: "New Item", description: "This is a new item" };
    createItem(newItemData);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button onClick={handleToggleModal} sx={{ width: "50px" }}>
          Create
        </Button>
        <Button sx={{ width: "50px" }}>Bulk Add </Button>
        <Button sx={{ width: "50px" }}>Delete </Button>
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
          <CMSCreateItemPage />
        </Box>
      </Modal>
    </>
  );
};

export default DashboardOptions;
