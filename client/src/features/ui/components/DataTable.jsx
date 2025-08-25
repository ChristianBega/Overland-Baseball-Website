// MUI components
import { styled } from "@mui/material";
import { Box, TableRow } from "@mui/material";

// Reusable table container for split-table layouts
export const StyledTableContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  // hide scrollbar
}));

// Fixed column table styling
export const StyledFixedTable = styled("table")(({ theme }) => ({
  borderCollapse: "collapse",
  tableLayout: "fixed",
  backgroundColor: theme.palette.background.paper,
  "& th, & td": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
  },
}));

// Scrollable table styling
export const StyledScrollableTable = styled("table")(({ theme }) => ({
  borderCollapse: "collapse",
  tableLayout: "fixed",
  backgroundColor: theme.palette.background.paper,
  "& th, & td": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
  },
  [theme.breakpoints.up("rosterDataTable")]: {
    width: "100%",
    height: "100%",
  },
}));

// Scrollable container for horizontal scroll
export const StyledScrollContainer = styled(Box)({
  overflowX: "auto",
  flexGrow: 1,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
});

// Themed table header row with conditional rounded corners
export const StyledTableHeader = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "isSplitTable" && prop !== "tableSection",
})(({ theme, isSplitTable, tableSection }) => ({
  backgroundColor: theme.palette.primary.main,
  "& th": {
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: "14px",
    // textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "none",
  },
  // Only add rounded corners for non-split tables
  ...(!isSplitTable && {
    "& th:first-of-type": {
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "16px",
    },
    "& th:last-of-type": {
      borderTopRightRadius: "16px",
      borderBottomRightRadius: "16px",
    },
  }),
  // For split tables, only round specific corners with more radius
  ...(isSplitTable &&
    tableSection === "fixed" && {
      "& th:first-of-type": {
        borderTopLeftRadius: "16px",
        borderBottomLeftRadius: "16px",
      },
    }),
  ...(isSplitTable &&
    tableSection === "scrollable" && {
      "& th:last-of-type": {
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
      },
    }),
}));

// Standard table row with alternating colors support
export const StyledTableRow = styled("tr")(({ theme, isEven }) => ({
  backgroundColor: isEven ? "white" : "#f5f5f5",
}));

// Standard table cell with theme styling
export const StyledTableCell = styled("td", {
  shouldForwardProp: (prop) => prop !== "index" && prop !== "length",
})(({ theme, index, length }) => ({
  padding: theme.spacing(1.5),
  fontSize: "14px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  verticalAlign: "middle",
  ...(index === length - 1 && {
    borderBottom: "1px solid #fff !important",
    // backgroundColor: "red",
  }),
}));
