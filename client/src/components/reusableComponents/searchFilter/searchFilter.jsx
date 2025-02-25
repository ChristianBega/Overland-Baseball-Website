import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, TextField, MenuItem, Chip, Stack, Menu } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * Material UI styled search and filter component for CMS tables
 *
 * @param {Object} props
 * @param {Array} props.data - The original data array to filter
 * @param {Function} props.onFilteredDataChange - Callback when filtered data changes
 * @param {Array} props.filterFields - Array of field keys to enable filtering on
 * @param {Object} props.customFieldLabels - Map field keys to display labels
 * @param {Boolean} props.showQuickFilters - Whether to show quick filter chips
 * @param {String} props.quickFilterField - Field to use for quick filter buttons
 * @param {Array} props.quickFilterValues - Values to create filter chips for
 * @param {String} props.placeholder - Custom placeholder for search input
 * @param {Object} props.sx - Additional MUI sx styling object
 */
const MuiSearchFilterComponent = ({
  data = [],
  onFilteredDataChange,
  filterFields = [],
  customFieldLabels = {},
  showQuickFilters = false,
  quickFilterField = "",
  quickFilterValues = [],
  placeholder = "Search...",
  sx = {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKey, setFilterKey] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);

  // Get available filter fields (use all object keys if filterFields not provided)
  const availableFilterFields = useMemo(() => {
    if (filterFields && filterFields.length > 0) {
      return filterFields;
    }

    if (data.length > 0) {
      return Object.keys(data[0]);
    }

    return [];
  }, [data, filterFields]);

  // Filter the data based on search term and selected filter key
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    return data.filter((item) => {
      if (filterKey === "all") {
        // Search in all fields
        return Object.entries(item).some(([key, value]) => {
          if (!value) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      } else {
        // Search in specific field
        const fieldValue = item[filterKey];
        return fieldValue && String(fieldValue).toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  }, [data, searchTerm, filterKey]);

  // Call the callback whenever filtered data changes
  useEffect(() => {
    if (onFilteredDataChange) {
      onFilteredDataChange(filteredData);
    }
  }, [filteredData, onFilteredDataChange]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Modified handler for filter button click
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterKeyChange = (value) => {
    setFilterKey(value);
    handleClose();
  };

  const applyQuickFilter = (value) => {
    setFilterKey(quickFilterField);
    setSearchTerm(value);
    setAnchorEl(null);
  };

  const clearFilters = () => {
    setFilterKey("all");
    setSearchTerm("");
    setAnchorEl(null);
  };

  const getFieldDisplayName = (key) => {
    if (customFieldLabels && customFieldLabels[key]) {
      return customFieldLabels[key];
    }

    return key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid rgba(0, 0, 0, 0.23)", // MUI default border color
          borderRadius: "4px",
          "&:hover": {
            borderColor: "rgba(0, 0, 0, 0.87)", // MUI hover border color
          },
        }}
      >
        {/* Filter Selector */}
        <Box
          onClick={handleFilterClick}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "6px 8px",
            cursor: "pointer",
            borderRight: "1px solid rgba(0, 0, 0, 0.23)",
            minWidth: "125px",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              maxWidth: "100px", // Limit width
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <KeyboardArrowDownIcon sx={{ ml: 0.5, flexShrink: 0 }} />
            {filterKey !== "all" ? getFieldDisplayName(filterKey) : "Filter by"}
          </Box>
        </Box>

        {/* Search Input */}
        <TextField
          fullWidth
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          variant="standard" // Changed to standard to remove double borders
          size="small"
          InputProps={{
            disableUnderline: true, // Remove the underline
            endAdornment: searchTerm && <ClearIcon color="action" sx={{ cursor: "pointer", mr: 1 }} onClick={clearFilters} />,
            sx: {
              padding: "6px 8px",
              "& input": {
                padding: 0,
              },
            },
          }}
        />

        {/* Filter Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            maxHeight: "200px",
            mt: "0.5rem",
            "& .MuiPaper-root": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              minWidth: "150px",
            },
          }}
        >
          <MenuItem onClick={() => handleFilterKeyChange("all")} selected={filterKey === "all"}>
            All Fields
          </MenuItem>
          {availableFilterFields.map((key) => (
            <MenuItem key={key} onClick={() => handleFilterKeyChange(key)} selected={filterKey === key}>
              {getFieldDisplayName(key)}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Quick Filter Chips */}
      {showQuickFilters && quickFilterField && quickFilterValues.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
          {quickFilterValues.map((value) => (
            <Chip
              key={value}
              label={value}
              size="small"
              color={searchTerm === value && filterKey === quickFilterField ? "primary" : "default"}
              onClick={() => applyQuickFilter(value)}
              clickable
            />
          ))}
        </Stack>
      )}

      {/* Filter Status Indicator */}
      {searchTerm && (
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip
            size="small"
            label={`${filterKey === "all" ? "All fields" : getFieldDisplayName(filterKey)}: "${searchTerm}"`}
            onDelete={clearFilters}
          />
          <Box sx={{ ml: 1, fontSize: "0.875rem" }}>
            {filteredData.length} of {data.length} items
          </Box>
        </Stack>
      )}
    </Box>
  );
};

MuiSearchFilterComponent.propTypes = {
  data: PropTypes.array.isRequired,
  onFilteredDataChange: PropTypes.func.isRequired,
  filterFields: PropTypes.array,
  customFieldLabels: PropTypes.object,
  showQuickFilters: PropTypes.bool,
  quickFilterField: PropTypes.string,
  quickFilterValues: PropTypes.array,
  placeholder: PropTypes.string,
  sx: PropTypes.object,
};

export default MuiSearchFilterComponent;
