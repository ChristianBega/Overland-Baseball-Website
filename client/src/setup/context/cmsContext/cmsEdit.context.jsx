import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCheckAuthorization } from "../../utils/helpers/checkAuthorization";
import { handleSaveRename } from "../../../components/contentManagementSystem/cmsMediaStorage/components/fileMenuOptions/fileMenuOptions";
import { updateCMSItem } from "../../utils/firebase/editItem";
import { UserContext } from "../user.context";
import { handleUploadFile } from "../../utils/firebase/uploadFile";

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
  handleFieldChangeWithFiles: () => {},
  setUploadType: () => {},
  uploadType: "url",
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
  const [uploadType, setUploadType] = useState("url"); //! used for cmsUploadItem component to track toggle mode
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

  const handleSaveAndUpdateItem = async (type, id, uploadType) => {
    if (!checkAuthorization(role)) return;

    setCmsOperationStatus({ type: "update cms", loading: true, error: null, success: false });
    console.log("uploadType", uploadType);
    console.log("type", type);
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

        // if schedule and no
      }

      if (type === "schedule") {
        if (uploadType === "file") {
          const { url } = await handleUploadFile(
            editableItemData.opponentIcon,
            uid,
            () => {},
            () => {},
            "schedule",
            "opponentIcon"
          );
          const updatedDataWithOpponentIconUrl = {
            ...editableItemData,
            opponentIcon: url,
          };
          await updateCMSItem(uid, role, id, updatedDataWithOpponentIconUrl, type);
        } else {
          // if uploadType is url then we need to update the editableItemData.opponentIcon with the url to firebase database.
          await updateCMSItem(uid, role, id, editableItemData, type);
        }
      }
      //! await updateCMSItem(uid, role, id, editableItemData, type);

      setCmsOperationStatus({ type: "update", loading: false, error: null, success: true });
      setTimeout(() => {
        setCmsOperationStatus({ type: "update", loading: false, error: null, success: false });
        handleCancelEditing();
      }, 3000);
    } catch (error) {
      setCmsOperationStatus({ type: "update", loading: false, error: error.message, success: false });
    }
  };
  const handleFieldChange = (field) => (event) => {
    if (!checkAuthorization(role)) return;

    // Extract the file from the event
    if (event?.target?.type === "file") {
      const file = event.target.files[0];
      if (file) {
        setEditableItemData((prevData) => ({
          ...prevData,
          [field]: file,
        }));
      }
    } else {
      const value = event?.target?.value;
      setEditableItemData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const checkForEditChanges = () => {
    return JSON.stringify(editableItemData) !== JSON.stringify(originalItemData);
  };

  const contextValue = {
    editableItemId,
    editableItemData,
    handleStartEditing,
    handleCancelEditing,
    handleFieldChange,
    checkForEditChanges,
    cmsOperationStatus,
    setCmsOperationStatus,
    editableItemDataOriginalCopy,
    handleSaveAndUpdateItem,
    handleFieldChangeWithFiles: () => {},
    setUploadType,
    uploadType,
  };

  return <CmsEditItemContext.Provider value={contextValue}>{children}</CmsEditItemContext.Provider>;
};
