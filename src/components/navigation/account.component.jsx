import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function Account() {
  return (
    <Link to="/">
      <IconButton sx={{ color: "#fff" }}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>
    </Link>
  );
}
