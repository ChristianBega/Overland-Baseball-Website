import { styled } from "@mui/material";
import { Box, TableRow } from "@mui/material";

export const RosterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

export const FixedColumnTable = styled("table")(({ theme }) => ({
  borderCollapse: "collapse",
  tableLayout: "fixed",
  backgroundColor: theme.palette.background.paper,
  "& th, & td": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
  },
}));

export const ScrollableTable = styled("table")(({ theme }) => ({
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

export const ScrollContainer = styled(Box)({
  overflowX: "auto",
  flexGrow: 1,
});

export const PlayerAvatar = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
  fontWeight: "bold",
}));

export const PlayerLink = styled("p")(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100px",
  margin: 0,
  // "&:hover": {
  //   textDecoration: "underline",
  // },
}));

export const PlayerNumber = styled("small")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "12px",
  backgroundColor: theme.palette.grey[300],
  height: "24px",
  width: "24px",
  borderRadius: "50%",
  textAlign: "center",
  lineHeight: "24px", 
  marginLeft: theme.spacing(0.5),
}));

export const TableHeader = styled(TableRow)({
  backgroundColor: "#1a2b4f",
  "& th": {
    color: "#fff",
    fontWeight: 500,
    padding: "16px",
    borderBottom: "none",
  },
});

export const PlayerImage = styled("img")({
  width: 36,
  height: 36,
  borderRadius: "50%",
  objectFit: "cover",
});

export const HeaderRow = styled(TableRow)({
  backgroundColor: "#1a2b4f",
});
