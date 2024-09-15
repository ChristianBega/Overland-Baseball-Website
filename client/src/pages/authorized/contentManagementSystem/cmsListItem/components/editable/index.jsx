import React, { useState, useEffect } from "react";

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
