import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { MenuItem, Chip, InputAdornment } from "@mui/material";
// Styled Components
import {
  StyledSearchContainer,
  StyledQuickFiltersStack,
  StyledSearchIcon,
  StyledClearIcon,
  StyledSearchField,
  StyledFilterMenu,
  StyledFilterStatusStack,
  StyledResultsCount,
} from "./SearchFilter.styles";

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

// TODO: Add a prop to allow for custom sort options (ascending, descending, alphabetical, reverse alphabetical, numeric, reverse numeric, date, reverse date....)
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
        // TODO: Maybe include common matches for abbreviations. For example for player "year", when searching for "senior", it should match "sr" and vice versa.
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

  // // Modified handler for filter button click
  // const handleFilterClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

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
    <StyledSearchContainer sx={sx}>
      {showQuickFilters && quickFilterField && quickFilterValues.length > 0 && (
        <StyledQuickFiltersStack direction="row" spacing={1}>
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
        </StyledQuickFiltersStack>
      )}

      <StyledSearchField
        fullWidth
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <StyledSearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <StyledClearIcon onClick={clearFilters} />
            </InputAdornment>
          ),
        }}
      />

      {/* Filter Menu */}
      <StyledFilterMenu
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
      >
        <MenuItem onClick={() => handleFilterKeyChange("all")} selected={filterKey === "all"}>
          All Fields
        </MenuItem>
        {availableFilterFields.map((key) => (
          <MenuItem key={key} onClick={() => handleFilterKeyChange(key)} selected={filterKey === key}>
            {getFieldDisplayName(key)}
          </MenuItem>
        ))}
      </StyledFilterMenu>

      {/* Filter Status Indicator */}
      {searchTerm && (
        <StyledFilterStatusStack direction="row" spacing={1}>
          <Chip
            size="small"
            label={`${filterKey === "all" ? "All fields" : getFieldDisplayName(filterKey)}: "${searchTerm}"`}
            onDelete={clearFilters}
          />
          <StyledResultsCount>
            {filteredData.length} of {data.length} items
          </StyledResultsCount>
        </StyledFilterStatusStack>
      )}
    </StyledSearchContainer>
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
