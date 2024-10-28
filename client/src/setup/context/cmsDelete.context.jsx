import React, { createContext, useState, useContext } from "react";
import { useCheckAuthorization } from "../utils/helpers/checkAuthorization";
import { deleteCMSItem, deleteItemFromStorage } from "../utils/firebase/deleteItem";
import { UserContext } from "./user.context";

export const CmsDeleteItemContext = createContext({
  handleDeleteItem: () => {},
});

export const CmsDeleteItemProvider = ({ children }) => {
  const { currentUserProfile } = useContext(UserContext);
  const checkAuthorization = useCheckAuthorization();

  const handleDeleteItem = async (id, type, values, handleCancelEditing) => {
    const { role, uid } = currentUserProfile;
    if (!checkAuthorization(role)) return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteCMSItem(uid, role, id, type);
      alert("Item deleted successfully from database");
      if (type === "documents") {
        await deleteItemFromStorage(uid, role, values[0].url);
        alert("Item deleted successfully from storage");
      }
      handleCancelEditing();
    }
  };

  const contextValue = {
    handleDeleteItem,
  };

  return <CmsDeleteItemContext.Provider value={contextValue}>{children}</CmsDeleteItemContext.Provider>;
};
