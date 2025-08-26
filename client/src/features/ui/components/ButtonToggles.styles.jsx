import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import ButtonBlock from "./ButtonBlock";

// Container for toggle buttons
export const StyledButtonTogglesContainer = styled(ButtonBlock)({
  gap: 0,
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  overflow: "hidden",
  minHeight: "41px",
  width: "112px",
});

// Individual toggle button
export const StyledToggleButton = styled(Button)(({ isActive }) => ({
  minWidth: "auto",
  padding: "4px",
  border: "none",
  borderRadius: "8px",
  "&:hover": {
    cursor: isActive ? "not-allowed !important" : "pointer !important",
  },
}));

// Icon styling
export const StyledToggleIcon = styled("div")({
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
