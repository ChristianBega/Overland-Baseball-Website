import { Modal, Button } from "@mui/material";
import React, { useState } from "react";
import RegistrationForm from "../forms/RegistrationForm.component";
import styled from "@emotion/styled";

const StyledModalContainer = styled("Box")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overFlow: "hidden",
  minWidth: "300px",
  maxWidth: 400,
  backgroundColor: "#d8d8d8",
  border: "1px solid #000",
  boxShadow: 24,
  padding: 20,
  borderRadius: 4,
}));

export default function YouthProgramModal({ datatypeRegistration }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} sx={{ alignSelf: "center" }} id="register" size="medium">
        Register here
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <StyledModalContainer>
          <RegistrationForm datatypeRegistration={datatypeRegistration} />
        </StyledModalContainer>
      </Modal>
    </>
  );
}
