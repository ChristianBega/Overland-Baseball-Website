import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CmsEditItemContext = createContext({
  editableItemId: null,
  editableItemData: null,
  startEditing: () => {},
  cancelEditing: () => {},
  updateEditableItemData: () => {},
  checkForEditChanges: () => {},
  cmsOperationStatus: { type: null, loading: false, error: null, success: false },
  setCmsOperationStatus: () => {},
  setEditableItemDataOriginalCopy: () => {},
  editableItemDataOriginalCopy: null,
});

export const CmsEditItemProvider = ({ children }) => {
  const [editableItemId, setEditableItemId] = useState(null);
  const [editableItemDataOriginalCopy, setEditableItemDataOriginalCopy] = useState(null);

  const [editableItemData, setEditableItemData] = useState(null);
  const [originalItemData, setOriginalItemData] = useState(null);
  const [cmsOperationStatus, setCmsOperationStatus] = useState({ type: null, loading: false, error: null, success: false });
  // create a state for tracking "please save or cancel the current edit before editing another item."

  const location = useLocation();

  // Reset editing state when URL changes
  useEffect(() => {
    cancelEditing();
  }, [location.search]);

  const startEditing = (itemId, itemData) => {
    if (editableItemId && editableItemId !== itemId) {
      alert("Please save or cancel the current edit before editing another item.");
      return;
    }
    setEditableItemId(itemId);
    setEditableItemData(itemData);
    setEditableItemDataOriginalCopy(itemData);
    setOriginalItemData(itemData);
  };

  const cancelEditing = () => {
    setEditableItemId(null);
    setEditableItemData(null);
    setEditableItemDataOriginalCopy(null);
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
    editableItemDataOriginalCopy,
  };

  return <CmsEditItemContext.Provider value={contextValue}>{children}</CmsEditItemContext.Provider>;
};
