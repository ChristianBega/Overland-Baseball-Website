// // import React, { createContext, useState } from "react";

// // export const CmsEditItemContext = createContext({
// //   editableItems: {},
// //   toggleEditMode: () => {},
// // });

// // export const CmsEditItemProvider = ({ children }) => {
// //   const [editableItems, setEditableItems] = useState({});
// //   const toggleEditMode = (itemId) => {
// //     console.log(itemId);
// //     setEditableItems((prevEditableItems) => ({
// //       ...prevEditableItems,
// //       [itemId]: !prevEditableItems[itemId],
// //     }));
// //   };
// //   const removeEditableItem = (itemId) => {
// //     setEditableItems((prevEditableItems) => {
// //       const newState = { ...prevEditableItems };
// //       delete newState[itemId];
// //       return newState;
// //     });
// //   };

// //   const contextValue = {
// //     editableItems,
// //     toggleEditMode,
// //     removeEditableItem,
// //   };

// //   return <CmsEditItemContext.Provider value={contextValue}>{children}</CmsEditItemContext.Provider>;
// // };

// import React, { createContext, useState } from "react";

// export const CmsEditItemContext = createContext({
//   editableItems: {},
//   toggleEditMode: () => {},
//   removeEditableItem: () => {},
//   currentEditingItem: null,
//   updateEditableData: () => {},
// });

// export const CmsEditItemProvider = ({ children }) => {
//   const [editableItems, setEditableItems] = useState({});
//   const [currentEditingItem, setCurrentEditingItem] = useState(null);

//   const toggleEditMode = (itemId) => {
//     if (currentEditingItem && currentEditingItem !== itemId) {
//       alert("Please save or cancel the current edit before editing another item.");
//       return;
//     }
//     setEditableItems((prevEditableItems) => ({
//       ...prevEditableItems,
//       [itemId]: !prevEditableItems[itemId],
//     }));
//     setCurrentEditingItem((prev) => (prev === itemId ? null : itemId));
//   };

//   const removeEditableItem = (itemId) => {
//     setEditableItems((prevEditableItems) => {
//       const newState = { ...prevEditableItems };
//       delete newState[itemId];
//       return newState;
//     });
//     setCurrentEditingItem(null);
//   };

//   const contextValue = {
//     editableItems,
//     toggleEditMode,
//     removeEditableItem,
//     currentEditingItem,
//   };

//   return <CmsEditItemContext.Provider value={contextValue}>{children}</CmsEditItemContext.Provider>;
// };

import React, { createContext, useState } from "react";

export const CmsEditItemContext = createContext({
  editableItems: {},
  toggleEditMode: () => {},
  removeEditableItem: () => {},
  currentEditingItem: null,
  editableData: {},
  updateEditableData: () => {},
});

export const CmsEditItemProvider = ({ children }) => {
  const [editableItems, setEditableItems] = useState({});
  const [currentEditingItem, setCurrentEditingItem] = useState(null);
  const [editableData, setEditableData] = useState({}); // State for editable data

  const toggleEditMode = (itemId) => {
    if (currentEditingItem && currentEditingItem !== itemId) {
      alert("Please save or cancel the current edit before editing another item.");
      return;
    }
    setEditableItems((prevEditableItems) => ({
      ...prevEditableItems,
      [itemId]: !prevEditableItems[itemId],
    }));
    setCurrentEditingItem((prev) => (prev === itemId ? null : itemId));

    // Reset the editableData when switching items
    setEditableData({});
  };

  const removeEditableItem = (itemId) => {
    setEditableItems((prevEditableItems) => {
      const newState = { ...prevEditableItems };
      delete newState[itemId];
      return newState;
    });
    setCurrentEditingItem(null);
    setEditableData({}); // Clear the editable data
  };

  const updateEditableData = (field, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  console.log(editableData);

  const contextValue = {
    editableItems,
    toggleEditMode,
    removeEditableItem,
    currentEditingItem,
    editableData,
    updateEditableData,
  };

  return <CmsEditItemContext.Provider value={contextValue}>{children}</CmsEditItemContext.Provider>;
};
