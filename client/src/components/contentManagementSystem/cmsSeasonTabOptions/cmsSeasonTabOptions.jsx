import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

const CmsSeasonTabOptions = ({ label, options, value, onChange, error, helperText }) => {
  // Default to first season if no value is set
  const currentValue = value || (options && options.length > 0 ? options[0].value : "");

  const handleChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: "block" }}>
        {label}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentValue} onChange={handleChange} aria-label="season tabs" variant="fullWidth">
          {options?.map((option) => (
            <Tab
              key={option.value}
              label={option.label}
              value={option.value}
              sx={{
                fontWeight: currentValue === option.value ? "bold" : "normal",
                color: currentValue === option.value ? "primary" : "inherit",
              }}
            />
          ))}
        </Tabs>
      </Box>

      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CmsSeasonTabOptions;
