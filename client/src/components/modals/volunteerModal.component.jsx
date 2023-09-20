import styled from "@emotion/styled";
import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import Form from "../forms/form.component";

const StyledModalContainer = styled("box")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90%",
  width: "90%",
  backgroundColor: "#eaeaea",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: 4,
  [theme.breakpoints.up("sm")]: {
    maxWidth: 550,
  },
}));
export default function VolunteerModal({ open, handleClose, currentEventData, datatypeRegistration, setCurrentEventData }) {
  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <StyledModalContainer>
          <Form
            currentEventData={currentEventData}
            setCurrentEventData={setCurrentEventData}
            handleClose={handleClose}
            datatypeRegistration={datatypeRegistration}
          />
        </StyledModalContainer>
      </Modal>
    </>
  );
}
