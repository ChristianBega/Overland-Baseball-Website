import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

export default function Account() {
  return (
    <IconButton sx={{ color: "#fff" }}>
      <AccountCircleIcon fontSize="large" />
    </IconButton>
  );
}
