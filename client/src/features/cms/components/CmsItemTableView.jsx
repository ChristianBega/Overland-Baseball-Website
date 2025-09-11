// Todo: We could find a better way to showcase the data on the page, rather than relying on the table data view.... the issue we face with the data table is its hard to manage different types of data... not a true CMS, rather a DMS....
import React, { useContext, useState, useCallback, useEffect } from "react";
import { Box, Grid, Stack, TableBody, TableHead } from "@mui/material";
import CmsListItem from "./CmsListItem";
// import CmsListItem from "../../../components/contentManagementSystem/cmsListItem/cmsListItem";
// import CmsOptionsPanel from "../cmsOptionsPanel";
import { CmsOptionsPanel } from "../../../features/cms";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import { CmsBulkActionContext } from "../../../features/cms/context/CmsBulkActions.context";
import InputFieldComponent from "../../../features/ui/components/InputFields";
import { CmsEditItemContext } from "../../../features/cms/context/CmsEdit.context";
// import { StyledTableCell } from "../../../utils/theme/index.styles";
import {
  StyledTableContainer,
  StyledScrollableTable,
  StyledTableHeader,
  StyledTableRow,
  StyledFixedTable,
  StyledScrollContainer,
  StyledTableCell,
} from "../../ui/components/DataTable";

import CmsTableHeader from "./CmsTableHeader";
import ActionButtonsCell from "./CmsListItemActionButton";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import CustomPagination from "../../../features/ui/components/Pagination";
import SearchFilterComponent from "../../../features/ui/components/SearchFilter";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  StyledNameHeaderCell,
  StyledTableBodyFixed,
  StyledTableHeadFixed,
  StyledTableRowWithBackground,
  StyledTableWrapper,
} from "../../roster/components/TeamRosterTableView.styles";
import CheckboxCell from "./CmsListItemCheckbox";

const CmsItemTableView = ({ currentItem }) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const itemType = urlParams.get("type");
  const { handleSelectAll, selectedItems } = useContext(CmsBulkActionContext);
  const { editableItemData } = useContext(CmsEditItemContext);
  const { data: originalData, isLoading, error } = useRealtimeData(currentItem?.linkName?.toLowerCase());
  const { isSm } = useMediaQueries();
  const [itemsPerPage, setItemsPerPage] = useState(6);
  // State for filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Reset to page 1 when filter changes
  const handleFilteredDataChange = useCallback((newFilteredData) => {
    setFilteredData(newFilteredData);
    setPage(1); // Reset to first page when filter changes
  }, []);

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
    originalData && originalData.length > 0 ? [...new Set(originalData.map((item) => item.status || item.type))].filter(Boolean).slice(0, 4) : [];
  useEffect(() => {
    setItemsPerPage(6);
  }, [itemType]);

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

  return (
    <Grid item xs={12} sx={{ marginBottom: "2rem" }}>
      <Box sx={{ marginTop: "2rem" }} role="region" aria-label={`${currentItem?.linkName || "Content"} management table`}>
        <Stack direction={isSm ? "row" : "column"} justifyContent="space-between" spacing={2} sx={{ marginBottom: "1rem" }}>
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

        <StyledTableWrapper>
          <StyledTableContainer>
            {/* Fixed Column Section */}
            <StyledFixedTable>
              <StyledTableHeadFixed>
                <StyledTableHeader isSplitTable={true} tableSection="fixed">
                  <StyledNameHeaderCell aria-label="Select all items" backgroundType={theme.palette.primary.main}>
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
                  </StyledNameHeaderCell>
                  <CmsTableHeader dataType={itemType} section="fixed" />
                </StyledTableHeader>
              </StyledTableHeadFixed>
              <StyledTableBodyFixed>
                {paginatedData?.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <StyledTableRowWithBackground key={`${currentItem}-fixed-${index}`}>
                      <CheckboxCell isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)} id={item.id} values={[item]} />
                      <CmsListItem id={item.id} indexz={index} values={[item]} section="fixed" />
                    </StyledTableRowWithBackground>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={100} align="center" role="cell">
                      {originalData?.length > 0 ? "No matching results found" : "No data available"}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </StyledTableBodyFixed>
            </StyledFixedTable>

            {/* Scrollable Column Section */}
            <StyledScrollContainer>
              <StyledScrollableTable>
                <TableHead sx={{ background: `${theme.palette.gradients.primaryToRight} !important` }}>
                  <StyledTableHeader isSplitTable={true} tableSection="scrollable">
                    <CmsTableHeader dataType={itemType} section="scrollable" />
                  </StyledTableHeader>
                </TableHead>
                <TableBody>
                  {paginatedData?.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <StyledTableRowWithBackground key={`${currentItem}-scrollable-${index}`}>
                        <CmsListItem id={item.id} indexz={index} values={[item]} section="scrollable" />
                        <ActionButtonsCell id={item.id} values={[item]} type={itemType} />
                      </StyledTableRowWithBackground>
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell colSpan={100} align="center" role="cell">
                        No data
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </StyledScrollableTable>
            </StyledScrollContainer>
          </StyledTableContainer>

          <CustomPagination
            totalItems={dataToDisplay?.length || 0}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={setPage}
            setItemsPerPage={setItemsPerPage}
            itemsPerPageBase={6}
          />
        </StyledTableWrapper>
      </Box>
    </Grid>
  );
};

export default CmsItemTableView;
