import React, { createContext, useState } from "react";

export const EditItemContext = createContext({
  activeIndex: "",
  isActive: Boolean,
  handleItemClick: () => {},
  setActiveIndex: () => {},
  setIsActive: () => {},
});

export const EditItemProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const handleItemClick = (index) => {
    if (activeIndex === index) {
      setIsActive(!isActive);
    } else {
      setActiveIndex(index);
      setIsActive(true);
    }
  };

  const contextValue = {
    activeIndex,
    isActive,
    handleItemClick,
    setActiveIndex,
    setIsActive,
  };

  return <EditItemContext.Provider value={contextValue}>{children}</EditItemContext.Provider>;
};
