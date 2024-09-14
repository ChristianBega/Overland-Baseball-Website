import { ListItemButton, styled } from "@mui/material";
import React, { useState } from "react";
const StyledListItemButton = styled(ListItemButton)(({ theme, selected, isActive }) => ({
  border: selected ? `2px solid ${isActive ? "green" : "red"}` : "none",
  cursor: "pointer",
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
}));
function ListComponent() {
  const [activeIndex, setActiveIndex] = useState(null); // State to track the clicked item
  const [isActive, setIsActive] = useState(true); // State to decide the color of the border

  // Sample list of items
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  const handleItemClick = (index) => {
    setActiveIndex(index);
    setIsActive(!isActive); // Toggle the border color
  };

  return (
    <ul>
      {items.map((item, index) => (
        <StyledListItemButton key={index} onClick={() => handleItemClick(index)} selected={activeIndex === index} isActive={isActive}>
          {item}
        </StyledListItemButton>
      ))}
    </ul>
  );
}

export default ListComponent;
