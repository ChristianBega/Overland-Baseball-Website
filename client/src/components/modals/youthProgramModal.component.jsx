import { Box, Modal, Button } from "@mui/material";
import React, { useState } from "react";
import YouthProgramForm from "../forms/youthProgramForm.component";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function YouthProgramModal() {
  const [open, setOpen] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} sx={{ alignSelf: "center" }} id="register" size="medium">
        Register here
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <YouthProgramForm />
        </Box>
      </Modal>
    </>
  );
}
