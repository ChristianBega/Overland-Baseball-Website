// Common styles for all input fields
export const commonInputStyles = {
  width: "100%",
  padding: "8px 12px",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  color: "rgba(0, 0, 0, 0.87)",
  backgroundColor: "transparent",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s ease",
  "&:hover": {
    borderColor: "#000000",
  },
  "&:focus": {
    borderColor: "#1976d2",
    borderWidth: "2px",
  },
};

// Common label styles
export const commonLabelStyles = {
  color: "rgba(0, 0, 0, 0.6)",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: 1.4375,
  marginBottom: "4px",
};

// Specific input type variations
export const inputVariants = {
  datetime: {
    "&::-webkit-calendar-picker-indicator": {
      opacity: 0.6,
      cursor: "pointer",
      transition: "opacity 0.2s ease",
    },
    "&::-webkit-calendar-picker-indicator:hover": {
      opacity: 1,
    },
  },
  date: {
    "&::-webkit-calendar-picker-indicator": {
      opacity: 0.6,
      cursor: "pointer",
      transition: "opacity 0.2s ease",
    },
    "&::-webkit-calendar-picker-indicator:hover": {
      opacity: 1,
    },
  },
  time: {
    "&::-webkit-calendar-picker-indicator": {
      opacity: 0.6,
      cursor: "pointer",
      transition: "opacity 0.2s ease",
    },
    "&::-webkit-calendar-picker-indicator:hover": {
      opacity: 1,
    },
  },
  numeric: {
    "&::-webkit-inner-spin-button": {
      opacity: 0.6,
      cursor: "pointer",
    },
    "&::-webkit-outer-spin-button": {
      opacity: 0.6,
      cursor: "pointer",
    },
  },
  textarea: {
    minHeight: "120px",
    resize: "vertical",
  },
  select: {
    appearance: "none",
    paddingRight: "32px", // Space for dropdown icon
  },
  checkbox: {
    width: "auto",
    cursor: "pointer",
    marginRight: "8px",
  },
  file: {
    cursor: "pointer",
    "&::file-selector-button": {
      padding: "6px 12px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      backgroundColor: "transparent",
      marginRight: "8px",
      cursor: "pointer",
    },
  },
  // Add more variants as needed
};

// Helper function to merge styles
export const mergeStyles = (baseStyles, variantStyles, customStyles) => ({
  ...baseStyles,
  ...variantStyles,
  ...customStyles,
});
