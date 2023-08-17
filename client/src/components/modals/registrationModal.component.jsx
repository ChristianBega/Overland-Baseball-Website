import { Modal, Button, Box } from "@mui/material";
import React, { useState } from "react";
import Form from "../forms/form.component";
import styled from "@emotion/styled";

const StyledModalContainer = styled("Box")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  backgroundColor: "#eaeaea",
  border: "1px solid #000",
  boxShadow: 24,
  padding: 10,
  borderRadius: 4,
  [theme.breakpoints.up("sm")]: {
    maxWidth: 550,
  },
}));

export default function YouthProgramModal({ datatypeRegistration, currentEventData, setCurrentEventData, setCurrentSeason }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ textAlign: { xs: "center", md: "start" } }}>
        <Button onClick={handleOpen} id="register" size="medium" sx={{ marginTop: 4, maxWidth: "200px" }}>
          Register here
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <StyledModalContainer>
          <Form
            setCurrentSeason={setCurrentSeason}
            setCurrentEventData={setCurrentEventData}
            currentEventData={currentEventData}
            datatypeRegistration={datatypeRegistration}
            handleClose={handleClose}
          />
        </StyledModalContainer>
      </Modal>
    </>
  );
}
