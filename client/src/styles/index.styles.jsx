import { styled, TableCell, TableRow } from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f2f2f2",
    boxShadow: 10,
  },
}));

export const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
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
  "&.center-flex-row": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.table-cell-center": {
    textAlign: "center",
  },
  "&.table-header-cell": {
    background: "#f2f2f2",
    textAlign: "center",
  },
  "&.table-header-cell-narrow": {
    width: "5%",
    // backgroundColor: "green !important",
  },
  "&.table-header-cell-normal": {
    width: "15%",
  },
  "&.table-header-cell-wide": {
    width: "20%",
  },
  "&.table-cell-dark": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
  "&.isEditable": {
    textAlign: "left",
    "input": {
      display: "block",
      width: "100%",
    },
  },
  "&.delete-button-cell": {
    maxWidth: "50px !important",
    padding: "0",
  },
  "&.table-cell-cms-list-item": {
    textAlign: "center",
    height: "100px",
  },
  "&.special-symbol-style": {
    fontFamily: "'Lilita One', cursive",
    fontSize: 18,
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: 22,
    },
  },
}));
