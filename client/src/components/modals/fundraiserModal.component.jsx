import React from "react";
import { Modal } from "@mui/material";
import styled from "@emotion/styled";
import FundraisersDataGrid from "../../pages/events/components/fundraisersDataGrid/fundraisersDataGrid.component";

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
  padding: 10,
  [theme.breakpoints.up("xs")]: {
    minWidth: 350,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 700,
  },
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  background: "linear-gradient(153deg, rgba(9,31,64,0.3) 51%, rgba(0,154,78,0.3) 98%) !important",
}));

export default function FundraiserModal({ open, handleClose, events, currentEvent }) {
  return (
    <>
      <StyledModal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <StyledModalContainer>
          <FundraisersDataGrid events={events} currentEvent={currentEvent} handleClose={handleClose} />
        </StyledModalContainer>
      </StyledModal>
    </>
  );
}
