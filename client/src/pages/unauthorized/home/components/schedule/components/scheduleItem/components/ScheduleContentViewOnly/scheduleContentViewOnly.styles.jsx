import { styled } from "@mui/material/styles";
import { Box, Link, Stack } from "@mui/material";

export const StyledScheduleItemContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  alignItems: "center",
  padding: ".5rem",
  borderRadius: "4px",
  "&:hover": {
    transition: "all .3s ease-in-out",
    backgroundColor: `${theme.palette.primary.main}`,
    cursor: "pointer",
  },
}));

export const StyledLogoStack = styled(Stack)({
  paddingInline: ".5rem",
});

export const StyledDateStack = styled(Stack)({
  direction: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "65px",
  minWidth: "110px",
  borderRight: "1px solid hsl(0, 0%, 90%)",
  padding: "0.5rem",
  color: "#fff",
});

export const StyledLocationLink = styled(Link)({
  color: "#fff",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: ".25rem",
  marginBottom: 0,
  width: "100%",
  justifyContent: "center",
});
