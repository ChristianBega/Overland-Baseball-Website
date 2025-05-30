import React, { createContext, useState } from "react";

export const CmsCreateItemContext = createContext({});

export const CmsCreateItemProvider = ({ children }) => {
  const [newItem, setNewItem] = useState(null);

  const createItem = (itemData) => {
    // Here you would typically make an API call to create the item
    // For now, we'll just set it in the state
    setNewItem(itemData);
    console.log("New item created:", itemData);
  };

  const contextValue = {
    newItem,
    createItem,
  };

  return <CmsCreateItemContext.Provider value={contextValue}>{children}</CmsCreateItemContext.Provider>;
};
