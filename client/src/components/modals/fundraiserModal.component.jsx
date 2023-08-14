import React from "react";
import { Modal } from "@mui/material";
import styled from "@emotion/styled";
import FundraisersDataGrid from "../events/fundraisersDataGrid.component";

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
  padding: "1rem",
  [theme.breakpoints.up("xs")]: {
    minWidth: 350,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 700,
  },
}));

export default function FundraiserModal({ open, handleClose, events, currentEvent }) {
  return (
    <>
      <Modal
        sx={{ background: "none" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModalContainer>
          <FundraisersDataGrid events={events} currentEvent={currentEvent} handleClose={handleClose} />
        </StyledModalContainer>
      </Modal>
    </>
  );
}
