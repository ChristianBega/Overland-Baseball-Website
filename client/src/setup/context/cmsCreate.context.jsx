import React, { createContext, useState } from "react";

export const CmsCreateItemContext = createContext({
  // editableItems: {},
  // toggleEditMode: () => {},
});

export const CmsCreateItemProvider = ({ children }) => {
  // const [editableItems, setCreateableItems] = useState({});
  // console.log(editableItems);
  // const toggleCreateMode = (itemId) => {
  //   setCreateableItems((prevCreateableItems) => ({
  //     ...prevCreateableItems,
  //     [itemId]: !prevCreateableItems[itemId],
  //   }));
  // };
  // const removeCreateableItem = (itemId) => {
  //   setCreateableItems((prevCreateableItems) => {
  //     const newState = { ...prevCreateableItems };
  //     delete newState[itemId];
  //     return newState;
  //   });
  // };

  const contextValue = {
    // editableItems,
    // toggleCreateMode,
    // removeCreateableItem,
  };

  return <CmsCreateItemContext.Provider value={contextValue}>{children}</CmsCreateItemContext.Provider>;
};
