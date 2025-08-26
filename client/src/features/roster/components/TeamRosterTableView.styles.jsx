import { styled } from "@mui/material/styles";
import { Box, TableHead, TableBody, TableCell } from "@mui/material";
import { StyledTableCell } from "../../ui/components/DataTable";

// Main table wrapper with background and border
export const StyledTableWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8f9fa",
  borderRadius: "16px",
  padding: "20px",
  border: `1px solid ${theme.palette.divider}`,
}));

// Table head with padding override
export const StyledTableHeadFixed = styled(TableHead)({
  padding: "0 !important",
});

// Table body with border
export const StyledTableBodyFixed = styled(TableBody)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
}));

// Name header cell with specific styling
export const StyledNameHeaderCell = styled(TableCell)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  minHeight: "60px",
  height: "60px",
  padding: "12px 1.5rem !important",
}));

// Data header cells in scrollable section
export const StyledDataHeaderCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "60px",
  height: "60px",
}));

// Table row with background
export const StyledTableRowWithBackground = styled("tr")({
  backgroundColor: "#f8f9fa",
});

// Avatar cell extending StyledTableCell to inherit index/length logic
export const StyledAvatarCell = styled(StyledTableCell)({
  width: 48,
  height: 67,
  padding: "12px 1.5rem !important",
});

// Name cell extending StyledTableCell
export const StyledNameCell = styled(StyledTableCell)({
  height: 60,
});

// Data cells extending StyledTableCell with height
export const StyledDataCell = styled(StyledTableCell)({
  height: 67,
});

// Data cells with minimum width extending StyledTableCell
export const StyledDataCellWithMinWidth = styled(StyledTableCell)(({ minWidth }) => ({
  height: 67,
  minWidth: minWidth || "auto",
}));
