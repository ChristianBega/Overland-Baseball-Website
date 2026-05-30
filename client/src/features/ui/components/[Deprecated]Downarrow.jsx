import React from "react";
import "./downarrow.css";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
export default function Downarrow() {
  return (
    <div class="container">
      <a href="#home-section" class="bounce">
        <KeyboardDoubleArrowDownIcon sx={{ fontSize: "65px" }} />
      </a>
    </div>
  );
}
