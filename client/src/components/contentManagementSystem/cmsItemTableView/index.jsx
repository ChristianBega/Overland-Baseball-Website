import React, { useContext, useState } from "react";
import { Box, Grid, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import CmsListItem from "../cmsListItem/cmsListItem";
import CmsOptionsPanel from "../cmsOptionsPanel";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import { CmsBulkActionContext } from "../../../setup/context/cmsContext/cmsBulkActions.context";
import InputFieldComponent from "../../inputFields/inputFields";
import { CmsEditItemContext } from "../../../setup/context/cmsContext/cmsEdit.context";
// import { convertToTitleCase } from "../../../setup/utils/helpers/convertText";
import { StyledTableCell } from "../../../styles/index.styles";
import CmsTableViewHeader from "./components/cmsTableViewHeader/cmsTableViewHeader";
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";
import CustomPagination from "../../reusableComponents/pagination/pagination";

const CmsItemTableView = ({ currentItem }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const { handleSelectAll, selectedItems } = useContext(CmsBulkActionContext);
  const { editableItemData } = useContext(CmsEditItemContext);
  const { data: displayData, isLoading, error } = useRealtimeData(currentItem?.linkName?.toLowerCase());
  // const currentMenuItemType = currentItem?.linkName || "";
  const { isSm } = useMediaQueries();

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

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = displayData?.slice(startIndex, endIndex);

  return (
    <Grid item xs={12} lg={12}>
      <Box sx={{ marginTop: "2rem" }} role="region" aria-label={`${currentItem?.linkName || "Content"} management table`}>
        <Stack direction={isSm ? "row" : "column"} justifyContent="space-between" spacing={2} sx={{ marginBottom: "1rem" }}>
          <CmsOptionsPanel />
          <InputFieldComponent type="text" placeholder="Search..." disabled aria-label="Search content" />
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
                    checked={displayData?.length > 0 ? displayData?.length === selectedItems?.length : selectedItems?.length > 0}
                    onChange={(event) => handleSelectAll(event, displayData)}
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
                    No data available
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <CustomPagination totalItems={displayData?.length} itemsPerPage={itemsPerPage} currentPage={page} onPageChange={setPage} />
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default CmsItemTableView;
