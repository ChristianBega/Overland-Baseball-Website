import React from "react";
import { Modal, Box, styled } from "@mui/material";

const StyledModalContainer = styled(Box)(({ theme, modalType }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "8px",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  boxShadow: 24,
  padding: "1rem",
  maxHeight: "90%",
  maxWidth: modalType === "mediaStorage" ? "800px" : "500px",
  overflow: "auto",
  width: "90%",
  [theme.breakpoints.up("md")]: {
    width: modalType === "mediaStorage" ? "80%" : "50%",
  },
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    // background: "linear-gradient(153deg, rgba(9,31,64,0.6487119437939111) 51%, rgba(0,154,78,0.6510538641686183) 98%)",
    background: "linear-gradient(135deg, rgba(76, 175, 80, 0.45) 30%, rgba(33, 150, 243, 0.55) 90%)",
    opacity: 0.8,
    backdropFilter: "blur(4px)",
  },
}));

const ModalComponent = ({ isOpen, onToggle, children, modalType }) => {
  return (
    <StyledModal open={isOpen} onClose={onToggle}>
      <StyledModalContainer modalType={modalType}>{children}</StyledModalContainer>
    </StyledModal>
  );
};

export default ModalComponent;
