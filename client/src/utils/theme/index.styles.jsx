import { Box, styled, TableCell, TableRow } from "@mui/material";

// TODO: Once we redesign all tables to use new DataTable.jsx, we can remove the StyledTableRow and StyledTableCell components
// Table Styles
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f2f2f2",
    boxShadow: 10,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme, isCmsItem }) => ({
  "&.table-cell-center": {
    textAlign: "center",
  },
  "&.table-header-cell": {
    background: "#f2f2f2",
  },
  "&.table-header-cell-narrow": {
    width: "5%",
  },
  "&.table-header-cell-narrow-extra": {
    width: "10%",
  },
  "&.table-header-cell-normal": {
    width: "15%",
  },
  "&.table-header-cell-wide": {
    width: "20%",
  },
  "&.table-header-cell-extra-wide": {
    minWidth: "30%",
  },
  "&.table-cell-dark": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    // color: theme.palette.text.primary,
  },
  "&.table-cell-accent": {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    // color: theme.palette.text.primary,
  },
  "&.isEditable": {
    textAlign: "left",
    "input": {
      display: "block",
      width: "100%",
    },
  },
  "&.delete-button-cell": {
    padding: "0 1rem 0 0",
    width: "64px",
  },
  "&.table-cell-cms-list-item": {
    textAlign: "center",
    // height: "100px",
  },
  "&.special-symbol-style": {
    fontFamily: "'Lilita One', cursive",
    fontSize: 18,
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: 22,
    },
  },

  ...(isCmsItem && {
    padding: ".5rem",
  }),
  ...(!isCmsItem && {
    padding: "1.5rem",
  }),
}));

// Logos
export const LogoImage = styled(Box)(({ theme }) => ({
  width: "65px",
  height: "65px",
  display: "flex",
  objectFit: "contain",
  borderRadius: "50%",
  // margin: "auto",
  "&.logo-image-square": {
    borderRadius: "0",
  },
  "&.logo-image-opponent": {
    margin: "auto 1.5rem auto 0",
  },
}));

export const TeamLogo = styled(Box)(({ theme }) => ({
  width: "55px",
  height: "55px",
  display: "flex",
  objectFit: "contain",
  borderRadius: "50%",
  // margin: "auto",
  "&.logo-image-square": {
    borderRadius: "0",
  },
  "&.logo-image-opponent": {
    margin: "auto 1.5rem auto 0",
  },
  // [theme.breakpoints.up("md")]: {
  //   width: "65px",
  //   height: "65px",
  // },
}));

// Forms
export const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));
