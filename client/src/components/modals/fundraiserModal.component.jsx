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
  overFlow: "hidden",
  backgroundColor: "#d8d8d8",
  border: "1px solid #000",
  boxShadow: 24,
  padding: 20,
  borderRadius: 4,
  [theme.breakpoints.down("sm")]: {
    minWidth: 340,
  },
  [theme.breakpoints.only("sm")]: {
    minWidth: 600,
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 700,
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
          <FundraisersDataGrid events={events} currentEvent={currentEvent} />
        </StyledModalContainer>
      </Modal>
    </>
  );
}
