import { styled, TableCell, TableRow } from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f2f2f2",
    boxShadow: 10,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.isEditable": {
    textAlign: "left",
    "input": {
      display: "block",
      width: "100%",
    },
  },
  "&.table-cell-center": {
    textAlign: "center",
  },
  "&.table-cell-dark": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
  "&.special-symbol-style": {
    fontFamily: "'Lilita One', cursive",
    fontSize: 18,
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: 22,
    },
  },
  "& .center-flex-row": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));
