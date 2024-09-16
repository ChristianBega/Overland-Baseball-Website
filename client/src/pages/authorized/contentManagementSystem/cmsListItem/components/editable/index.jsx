import React, { useState, useEffect, useContext } from "react";
import { CmsEditItemContext } from "../../../../../../setup/context/cmsEdit.context";

const withEditableFields = (WrappedComponent) => {
  return ({ data, isEditable, ...props }) => {
    const [editableData, setEditableData] = useState(() => {
      const initialState = {};
      Object.keys(data).forEach((key) => {
        initialState[key] = data[key];
      });
      return initialState;
    });

    useEffect(() => {
      if (isEditable) {
        setEditableData(() => {
          const newState = {};
          Object.keys(data).forEach((key) => {
            newState[key] = data[key];
          });
          return newState;
        });
      }
    }, [isEditable, data]);

    // Generic handler for input changes
    const handleChange = (field) => (e) => {
      setEditableData({
        ...editableData,
        [field]: e.target.value,
      });
    };

    return <WrappedComponent {...props} isEditable={isEditable} editableData={editableData} handleChange={handleChange} />;
  };
};

export default withEditableFields;

// import React, { useContext, useEffect } from "react";
// import { CmsEditItemContext } from "../../../../../../setup/context/cmsEdit.context";

// const withEditableFields = (WrappedComponent) => {
//   return ({ data, isEditable, ...props }) => {
//     console.log(data);
//     const { editableData, updateEditableData, currentEditingItem } = useContext(CmsEditItemContext);

//     useEffect(() => {
//       if (isEditable && currentEditingItem) {
//         // Initialize editableData when entering edit mode
//         Object.keys(data).forEach((key) => {
//           updateEditableData(key, data[key]);
//         });
//       }
//     }, [isEditable, currentEditingItem, data, updateEditableData]);

//     const handleChange = (field) => (e) => {
//       updateEditableData(field, e.target.value); // Use context method
//     };

//     return <WrappedComponent {...props} isEditable={isEditable} editableData={editableData} handleChange={handleChange} />;
//   };
// };

// export default withEditableFields;
