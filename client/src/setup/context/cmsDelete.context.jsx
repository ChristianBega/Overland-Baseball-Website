import React, { createContext, useState } from "react";

export const CmsDeleteItemContext = createContext({
  // editableItems: {},
  // toggleEditMode: () => {},
});

export const CmsDeleteItemProvider = ({ children }) => {
  // const [editableItems, setDeleteableItems] = useState({});
  // console.log(editableItems);
  // const toggleDeleteMode = (itemId) => {
  //   setDeleteableItems((prevDeleteableItems) => ({
  //     ...prevDeleteableItems,
  //     [itemId]: !prevDeleteableItems[itemId],
  //   }));
  // };
  // const removeDeleteableItem = (itemId) => {
  //   setDeleteableItems((prevDeleteableItems) => {
  //     const newState = { ...prevDeleteableItems };
  //     delete newState[itemId];
  //     return newState;
  //   });
  // };

  const contextValue = {
    // editableItems,
    // toggleDeleteMode,
    // removeDeleteableItem,
  };

  return <CmsDeleteItemContext.Provider value={contextValue}>{children}</CmsDeleteItemContext.Provider>;
};
