import styled from "@emotion/styled";
import { Modal } from "@mui/material";
import React from "react";
import VolunteerForm from "../forms/VolunteerForm.component";

const StyledModalContainer = styled("box")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90%",
  width: "90%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: 550,
  },
  backgroundColor: "#eaeaea",
  border: "1px solid #000",
  boxShadow: 24,
  // padding: 10,
  borderRadius: 4,
}));
export default function VolunteerModal({ open, handleClose, currentEventData }) {
  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <StyledModalContainer>
          <VolunteerForm currentEventData={currentEventData} handleClose={handleClose} />
        </StyledModalContainer>
      </Modal>
    </>
  );
}
