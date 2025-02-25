import React, { useContext, useState, useCallback } from "react";
import { Box, Grid, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import CmsListItem from "../cmsListItem/cmsListItem";
import CmsOptionsPanel from "../cmsOptionsPanel";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import { CmsBulkActionContext } from "../../../setup/context/cmsContext/cmsBulkActions.context";
import InputFieldComponent from "../../inputFields/inputFields";
import { CmsEditItemContext } from "../../../setup/context/cmsContext/cmsEdit.context";
import { StyledTableCell } from "../../../styles/index.styles";
import CmsTableViewHeader from "./components/cmsTableViewHeader/cmsTableViewHeader";
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";
import CustomPagination from "../../reusableComponents/pagination/pagination";
import SearchFilterComponent from "../../reusableComponents/searchFilter/searchFilter";

const CmsItemTableView = ({ currentItem }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const { handleSelectAll, selectedItems } = useContext(CmsBulkActionContext);
  const { editableItemData } = useContext(CmsEditItemContext);
  const { data: originalData, isLoading, error } = useRealtimeData(currentItem?.linkName?.toLowerCase());
  const { isSm } = useMediaQueries();

  // State for filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Reset to page 1 when filter changes
  const handleFilteredDataChange = useCallback((newFilteredData) => {
    setFilteredData(newFilteredData);
    setPage(1); // Reset to first page when filter changes
  }, []);

  if (isLoading) {
    return (
      <Grid item xs={12} lg={12}>
        <Box sx={{ marginTop: "2rem" }}>Loading...</Box>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid item xs={12} lg={12}>
        <Box sx={{ marginTop: "2rem" }}>Error: {error.message}</Box>
      </Grid>
    );
  }

  const dataToDisplay = filteredData.length > 0 || (filteredData.length === 0 && originalData?.length === 0) ? filteredData : originalData || [];

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = dataToDisplay?.slice(startIndex, endIndex);

  // Determine which fields to show in filter dropdown
  // Customize this based on your data structure
  const filterFields =
    originalData && originalData.length > 0
      ? Object.keys(originalData[0]).filter((key) => typeof originalData[0][key] === "string" || typeof originalData[0][key] === "number")
      : [];

  const customFieldLabels = {
    // Example: 'fieldName': 'Display Label'
    "id": "ID",
    "title": "Title",
    "createdAt": "Created Date",
    // Add more mappings as needed
  };

  // Optional: Quick filter values (if applicable)
  // Example for filtering by status or type
  const quickFilterValues =
    originalData && originalData.length > 0
      ? [...new Set(originalData.map((item) => item.status || item.type))].filter(Boolean).slice(0, 4) // Limit to a reasonable number
      : [];

  return (
    <Grid item xs={12} lg={12}>
      <Box sx={{ marginTop: "2rem" }} role="region" aria-label={`${currentItem?.linkName || "Content"} management table`}>
        <Stack direction={isSm ? "row" : "column"} justifyContent="space-between" spacing={2} sx={{ marginBottom: "1rem" }}>
          {/* Replace the disabled search input with our reusable search filter */}
          <SearchFilterComponent
            data={originalData || []}
            onFilteredDataChange={handleFilteredDataChange}
            filterFields={filterFields}
            customFieldLabels={customFieldLabels}
            showQuickFilters={quickFilterValues.length > 0}
            quickFilterField="status" // or "type" - change as needed
            quickFilterValues={quickFilterValues}
          />
          <CmsOptionsPanel />
        </Stack>

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label={`${currentItem?.linkName || "Content"} table`}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "red" }}>
                <StyledTableCell className="table-cell-dark table-header-cell-narrow" role="columnheader" scope="col" aria-label="Select all items">
                  <InputFieldComponent
                    customColor="white"
                    disabled={editableItemData}
                    type="checkbox"
                    checked={dataToDisplay?.length > 0 ? dataToDisplay?.length === selectedItems?.length : selectedItems?.length > 0}
                    onChange={(event) => handleSelectAll(event, dataToDisplay)}
                    inputProps={{
                      "aria-label": "Select all items",
                    }}
                  />
                </StyledTableCell>
                <CmsTableViewHeader />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.length > 0 ? (
                paginatedData.map((item, index) => <CmsListItem key={`${currentItem}-${index}`} id={item.id} indexz={index} values={[item]} />)
              ) : (
                <TableRow>
                  <StyledTableCell colSpan={100} align="center" role="cell">
                    {originalData?.length > 0 ? "No matching results found" : "No data available"}
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <CustomPagination totalItems={dataToDisplay?.length || 0} itemsPerPage={itemsPerPage} currentPage={page} onPageChange={setPage} />
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default CmsItemTableView;
