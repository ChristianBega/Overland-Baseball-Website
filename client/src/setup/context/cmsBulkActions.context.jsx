import React, { createContext, useState } from "react";

export const CmsBulkActionContext = createContext({
  selectedItems: [],
  progress: 0,
  setProgress: () => {},
  status: null,
  setStatus: () => {},
  handleCheckboxChange: () => {},
  setSelectedItems: () => {},
});

export const CmsBulkActionProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prevSelected) => prevSelected.filter((i) => i !== id));
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, id]);
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
  };

  return <CmsBulkActionContext.Provider value={contextValue}>{children}</CmsBulkActionContext.Provider>;
};
