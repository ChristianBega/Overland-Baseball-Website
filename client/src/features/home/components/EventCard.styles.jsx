import { styled, Typography } from "@mui/material";

export const StyledDescriptionText = styled(Typography)(({ theme, color }) => ({
  position: "relative",
  maxHeight: "4em",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  textOverflow: "ellipsis",
  background: `linear-gradient(to bottom, ${color || "#fff"}, rgba(255, 255, 255, 0.7))`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  "@media (min-width: 900px)": {
    maxHeight: "6em",
    WebkitLineClamp: 6,
  },
}));
