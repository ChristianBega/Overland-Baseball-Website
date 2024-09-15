import React, { createContext, useState } from "react";

export const CmsEditItemContext = createContext({
  editableItems: {},
  toggleEditMode: () => {},
});

export const CmsEditItemProvider = ({ children }) => {
  const [editableItems, setEditableItems] = useState({});
  const toggleEditMode = (itemId) => {
    setEditableItems((prevEditableItems) => ({
      ...prevEditableItems,
      [itemId]: !prevEditableItems[itemId],
    }));
  };
  const removeEditableItem = (itemId) => {
    setEditableItems((prevEditableItems) => {
      const newState = { ...prevEditableItems };
      delete newState[itemId];
      return newState;
    });
  };

  const contextValue = {
    editableItems,
    toggleEditMode,
    removeEditableItem,
  };

  return <CmsEditItemContext.Provider value={contextValue}>{children}</CmsEditItemContext.Provider>;
};
