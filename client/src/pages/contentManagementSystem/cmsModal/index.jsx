import React, { useState } from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material";
import { useModal } from "../../../setup/context/useCmsModal";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { deleteCMSItem } from "../../../setup/utils/firebase/deleteItem";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CmsModal = () => {
  const { isModalOpen, modalContent, closeModal, cmsType } = useModal();
  let queryParams = useUrlQueryParams();

  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");
  if (!isModalOpen) return null;

  const handleConfirm = () => {
    deleteCMSItem(uid, role, modalContent, type);

    closeModal();
  };
  const StyledModal = styled(Modal)(({ theme }) => ({
    background: "linear-gradient(153deg, rgba(9,31,64,0.3) 51%, rgba(0,154,78,0.3) 98%) !important",
    opacity: ".4",
    backdropFilter: "blur(2px)",
  }));
  return (
    <StyledModal open={isModalOpen} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you'd like to delete {type.charAt(0).toUpperCase() + type.slice(1)} Item <span>#{modalContent}</span>.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Button onClick={handleConfirm}>Confirm</Button>
        <Button sx={{ backgroundColor: "red" }} onClick={closeModal}>
          Cancel
        </Button>
      </Box>
    </StyledModal>
  );
};

export default CmsModal;
