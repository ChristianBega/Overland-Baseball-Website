import { styled, Typography } from "@mui/material";

export const StyledDescriptionText = styled(Typography)(({ theme }) => ({
  position: "relative",
  maxHeight: "4em",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  textOverflow: "ellipsis",
  background: "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.4))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));
