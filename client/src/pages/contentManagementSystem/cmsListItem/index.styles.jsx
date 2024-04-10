import styled from "@emotion/styled";
import { ListItem, List } from "@mui/material";

export const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  [theme.breakpoints.up("lg")]: {
    flexWrap: "nowrap",
  },
}));

export const StyledCmsItem = styled(ListItem)(({ theme }) => ({
  width: "49%",
  border: "1px solid red",
  padding: 0,
  "& p": {
    width: "100%",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
    webkitLineClamp: "2",
    backgroundColor: "red",
  },
  "& span": {
    color: "green",
    display: "block",
    backgroundColor: "#fff",
    paddingBlock: ".5rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "100%",

    "& span": {
      display: "inline",
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& span": {
      display: "block",
    },
  },
}));
