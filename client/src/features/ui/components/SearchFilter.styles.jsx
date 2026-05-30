import { styled } from "@mui/material/styles";
import { Box, TextField, Stack, Menu } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
export const StyledSearchContainer = styled(Box)({
  width: "100%",
});
export const StyledQuickFiltersStack = styled(Stack)({
  marginBottom: "16px", // theme.spacing(2)
  flexWrap: "wrap",
  gap: "8px", // theme.spacing(1)
});
export const StyledSearchIcon = styled(SearchIcon)({
  color: "rgba(0, 0, 0, 0.54)",
});
export const StyledClearIcon = styled(ClearIcon)({
  cursor: "pointer",
  color: "rgba(0, 0, 0, 0.54)",
  "&:hover": {
    color: "rgba(0, 0, 0, 0.87)",
  },
});
export const StyledSearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F8F9FA",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "12px",
    },
    "& input": {
      padding: "8px 4px",
    },
  },
}));
export const StyledFilterMenu = styled(Menu)({
  maxHeight: "200px",
  marginTop: "0.5rem",
  "& .MuiPaper-root": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    minWidth: "150px",
  },
});
export const StyledFilterStatusStack = styled(Stack)({
  marginTop: "8px", // theme.spacing(1)
});
export const StyledResultsCount = styled(Box)({
  marginLeft: "8px", // theme.spacing(1)
  fontSize: "0.875rem",
});
