import React, { createContext, useState } from "react";

export const CmsEditItemContext = createContext({
  editableItemId: null,
  editableItemData: null,
  startEditing: () => {},
  cancelEditing: () => {},
  updateEditableItemData: () => {},
  checkForEditChanges: () => {},
  cmsOperationStatus: { type: null, loading: false, error: null, success: false },
  setCmsOperationStatus: () => {},
});

export const CmsEditItemProvider = ({ children }) => {
  const [editableItemId, setEditableItemId] = useState(null);
  const [editableItemData, setEditableItemData] = useState(null);
  const [originalItemData, setOriginalItemData] = useState(null);
  const [cmsOperationStatus, setCmsOperationStatus] = useState({ type: null, loading: false, error: null, success: false });
  // create a state for tracking "please save or cancel the current edit before editing another item."

  const startEditing = (itemId, itemData) => {
    if (editableItemId && editableItemId !== itemId) {
      alert("Please save or cancel the current edit before editing another item.");
      return;
    }
    setEditableItemId(itemId);
    setEditableItemData(itemData);
    setOriginalItemData(itemData);
  };

  const cancelEditing = () => {
    setEditableItemId(null);
    setEditableItemData(null);
    setOriginalItemData(null);
  };

  const updateEditableItemData = (field, value) => {
    setEditableItemData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const checkForEditChanges = () => {
    return JSON.stringify(editableItemData) !== JSON.stringify(originalItemData);
  };

  const contextValue = {
    editableItemId,
    editableItemData,
    startEditing,
    cancelEditing,
    updateEditableItemData,
    checkForEditChanges,
    cmsOperationStatus,
    setCmsOperationStatus,
  };

  return <CmsEditItemContext.Provider value={contextValue}>{children}</CmsEditItemContext.Provider>;
};
