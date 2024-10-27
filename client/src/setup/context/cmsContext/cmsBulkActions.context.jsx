import React, { createContext, useState } from "react";

export const CmsBulkActionContext = createContext({
  selectedItems: [],
  progress: 0,
  setProgress: () => {},
  status: null,
  setStatus: () => {},
  handleCheckboxChange: () => {},
  setSelectedItems: () => {},
  handleSelectAll: () => {},
});

export const CmsBulkActionProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) => {
      const itemId = item.id; 
      const isItemSelected = prevSelected.some((selectedItem) => selectedItem.id === itemId);

      if (isItemSelected) {
        return prevSelected.filter((selectedItem) => selectedItem.id !== itemId);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const handleSelectAll = (event, displayData) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems(displayData);
    } else {
      setSelectedItems([]);
    }
  };

  const contextValue = {
    selectedItems,
    setSelectedItems,
    handleCheckboxChange,
    status,
    setStatus,
    progress,
    setProgress,
    handleSelectAll,
  };

  return <CmsBulkActionContext.Provider value={contextValue}>{children}</CmsBulkActionContext.Provider>;
};
