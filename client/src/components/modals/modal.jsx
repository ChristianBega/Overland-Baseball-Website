import React from "react";
import { Modal, Box } from "@mui/material";

const ModalComponent = ({ isOpen, onToggle, children }) => {
  return (
    <Modal open={isOpen} onClose={onToggle}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: "50%",
          maxHeight: "90%",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
