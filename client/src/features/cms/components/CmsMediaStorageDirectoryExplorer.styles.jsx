import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDirectoryButtonContainer = styled(Stack)({
  maxWidth: "70%",
  overflowX: "auto",
  paddingLeft: "3rem",
  paddingBlock: ".5rem",
  "&::-webkit-scrollbar": {
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

export const StyledDirectoryButton = styled(Button)(({ theme, selectedSubDirectory, directory }) => ({
  border: selectedSubDirectory === directory ? `1px solid ${theme.palette.secondary.main}` : "1px solid transparent",
  minWidth: "145px",
}));
