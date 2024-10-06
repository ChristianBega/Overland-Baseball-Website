import React, { useContext } from "react";
import { Box, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, useMediaQuery } from "@mui/material";
import CmsListItem from "../cmsListItem/cmsListItem";
import CmsOptionsPanel from "../cmsOptionsPanel";
import { useTheme } from "@emotion/react";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import { CmsBulkActionContext } from "../../../setup/context/cmsBulkActions.context";
import InputFieldComponent from "../../inputFields/inputFields";
import { CmsEditItemContext } from "../../../setup/context/cmsEdit.context";

const CmsItemTableView = ({ currentItem }) => {
  const theme = useTheme();
  const { handleSelectAll, selectedItems } = useContext(CmsBulkActionContext);
  const { editableItemData } = useContext(CmsEditItemContext);
  const { data: displayData, isLoading, error } = useRealtimeData(currentItem?.linkName?.toLowerCase());

  const tableHeaders =
    displayData && displayData.length > 0
      ? Object.keys(displayData[0]).filter((key) => key !== "id" && key !== "addedByUserUid" && key !== "createdAt" && key !== "updatedAt")
      : [];
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid item xs={12} lg={12}>
      <Box sx={{ marginTop: "2rem" }}>
        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={2} sx={{ marginBottom: "1rem", padding: "1rem" }}>
          <CmsOptionsPanel />
          <InputFieldComponent type="text" placeholder="Search..." />
        </Stack>
        <div>
          {/* <LoadingErrorIndicator isLoading={isLoading} error={error} /> */}
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <TableHead>
              <TableCell>
                <input
                  disabled={editableItemData}
                  type="checkbox"
                  checked={displayData?.length > 0 ? displayData?.length === selectedItems?.length : selectedItems?.length > 0}
                  onChange={(event) => handleSelectAll(event, displayData)}
                />
              </TableCell>
              {tableHeaders.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableHead>
            <Table aria-label="cms table">
              <TableBody>
                {displayData ? (
                  displayData.map((item, index) => <CmsListItem id={item.id} indexz={index} values={[item]} key={`${currentItem}-${index}`} />)
                ) : (
                  <p>No data</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </Grid>
  );
};

export default CmsItemTableView;
