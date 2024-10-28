import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCheckAuthorization } from "../../utils/helpers/checkAuthorization";
import { handleSaveRename } from "../../../components/contentManagementSystem/cmsMediaStorage/components/fileMenuOptions/fileMenuOptions";
import { updateCMSItem } from "../../utils/firebase/editItem";
import { UserContext } from "../user.context";

export const CmsEditItemContext = createContext({
  editableItemId: null,
  editableItemData: null,
  handleStartEditing: () => {},
  handleCancelEditing: () => {},
  handleEditableDataChange: () => {},
  handleFieldChange: () => {}, // New method
  checkForEditChanges: () => {},
  cmsOperationStatus: { type: null, loading: false, error: null, success: false },
  setCmsOperationStatus: () => {},
  setEditableItemDataOriginalCopy: () => {},
  editableItemDataOriginalCopy: null,
  handleSaveAndUpdateItem: () => {},
});

export const CmsEditItemProvider = ({ children }) => {
  const checkAuthorization = useCheckAuthorization();
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const location = useLocation();
  const [editableItemId, setEditableItemId] = useState(null);
  const [editableItemDataOriginalCopy, setEditableItemDataOriginalCopy] = useState(null);
  const [editableItemData, setEditableItemData] = useState(null);
  const [originalItemData, setOriginalItemData] = useState(null);
  const [cmsOperationStatus, setCmsOperationStatus] = useState({ type: null, loading: false, error: null, success: false });

  // Reset editing state when URL changes
  useEffect(() => {
    handleCancelEditing();
  }, [location.search]);

  const handleStartEditing = (itemId, itemData) => {
    if (!checkAuthorization(role)) return;
    if (editableItemId && editableItemId !== itemId) {
      alert("Please save or cancel the current edit before editing another item.");
      return;
    }
    setEditableItemId(itemId);
    setEditableItemData(itemData);
    setEditableItemDataOriginalCopy(itemData);
    setOriginalItemData(itemData);
  };

  const handleCancelEditing = () => {
    setEditableItemId(null);
    setEditableItemData(null);
    setEditableItemDataOriginalCopy(null);
    setOriginalItemData(null);
  };

  const handleSaveAndUpdateItem = async (type, id) => {
    if (!checkAuthorization(role)) return;
    setCmsOperationStatus({ type: "update cms", loading: true, error: null, success: false });
    try {
      const { uid } = currentUserProfile;
      if (type === "documents") {
        await handleSaveRename(
          uid,
          role,
          editableItemDataOriginalCopy,
          editableItemData.fileName.split(".")[0],
          editableItemData.fileName.split(".")[1],
          () => {},
          () => {},
          type
        );
      } else {
        await updateCMSItem(uid, role, id, editableItemData, type);
      }
      setCmsOperationStatus({ type: "update", loading: false, error: null, success: true });
      setTimeout(() => {
        setCmsOperationStatus({ type: "update", loading: false, error: null, success: false });
        handleCancelEditing();
      }, 3000);
    } catch (error) {
      setCmsOperationStatus({ type: "update", loading: false, error: error.message, success: false });
    }
  };

  // const handleEditableDataChange = (field, value) => {
  //   setEditableItemData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };

  // const handleFieldChange = (field) => (event) => {
  //   if (!checkAuthorization(role)) return;
  //   const value = event?.target?.value;
  //   handleEditableDataChange(field, value);
  // };
  const handleFieldChange = (field) => (event) => {
    if (!checkAuthorization(role)) return;
    const value = event?.target?.value;
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
    handleStartEditing,
    handleCancelEditing,
    // handleEditableDataChange,
    handleFieldChange,
    checkForEditChanges,
    cmsOperationStatus,
    setCmsOperationStatus,
    editableItemDataOriginalCopy,
    handleSaveAndUpdateItem,
  };

  return <CmsEditItemContext.Provider value={contextValue}>{children}</CmsEditItemContext.Provider>;
};
