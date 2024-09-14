import styled from "@emotion/styled";
import { ListItem, List, Container, Divider, Box } from "@mui/material";

export const StyledList = styled(List)(({ theme, itemIndex }) => ({
  // display: "flex",
  // justifyContent: "center",
  // flexWrap: "wrap",
  // [theme.breakpoints.up("lg")]: {
  //   flexWrap: "nowrap",
  // },
  border: "1px solid red",
}));

export const StyledCmsItem = styled(ListItem)(({ theme }) => ({
  // When a button is click the itemIndex is passed,
  // Then using the itemIndex use the nth child selector to update the styles of the item clicked on
  width: "49%",
  marginBottom: "1rem",
  "& p": {
    width: "100%",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
    webkitLineClamp: "2",
    // backgroundColor: "red",
  },
  "& span": {
    // color: "green",
    display: "block",
    backgroundColor: "#fff",
    paddingBlock: ".5rem",
  },
}));

export const StyledCmsItemContainer = styled(Container)(({ theme, index, isActive, selected }) => ({
  zIndex: 500,
  position: "relative",
  "&::before": {
    content: selected ? '""' : "none",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: selected ? `${isActive ? "green" : "green"}` : "none",
    zIndex: -1,
  },
  // "&::after": {
  //   content: selected ? '""' : '""',
  //   display: "block",
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: "100%",
  //   backgroundColor: selected ? "green" : "red",
  //   zIndex: -1,
  // },
}));
