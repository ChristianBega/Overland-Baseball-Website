import React, { useContext } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CmsListItem from "../cmsListItem/cmsListItem";
import CmsOptionsPanel from "../cmsOptionsPanel";
import { useTheme } from "@emotion/react";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import { CmsBulkActionContext } from "../../../setup/context/cmsContext/cmsBulkActions.context";
import InputFieldComponent from "../../inputFields/inputFields";
import { CmsEditItemContext } from "../../../setup/context/cmsContext/cmsEdit.context";
// import { generateTableHeaders, tableHeadersMap } from "./helpers/generateTableHeaders";
// import { convertToTitleCase } from "../../../setup/utils/helpers/convertText";
import { StyledTableCell } from "../../../styles/index.styles";
import CmsTableViewHeader from "./components/cmsTableViewHeader/cmsTableViewHeader";

const CmsItemTableView = ({ currentItem }) => {
  const theme = useTheme();
  const { handleSelectAll, selectedItems } = useContext(CmsBulkActionContext);
  const { editableItemData } = useContext(CmsEditItemContext);
  const { data: displayData, isLoading, error } = useRealtimeData(currentItem?.linkName?.toLowerCase());
  const currentMenuItemType = currentItem?.linkName || "";

  // const tableHeaders = ddisplayData;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid item xs={12} lg={12}>
      <Box sx={{ marginTop: "2rem" }}>
        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={2} sx={{ marginBottom: "1rem", padding: "1rem" }}>
          <CmsOptionsPanel />
          <InputFieldComponent type="text" placeholder="Search..." />
        </Stack>
        <div>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table aria-label="cms table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="table-header-cell table-header-cell-narrow">
                    <input
                      disabled={editableItemData}
                      type="checkbox"
                      checked={displayData?.length > 0 ? displayData?.length === selectedItems?.length : selectedItems?.length > 0}
                      onChange={(event) => handleSelectAll(event, displayData)}
                    />
                  </StyledTableCell>
                  {/* <CmsTableViewHeader tableHeaders={displayData} editableItemData={editableItemData} /> */}
                  {/* {tableHeaders?.map((headerItem, index) => (
                    <StyledTableCell className={`table-header-cell ${headerItem.className}`} key={index}>
                      <Typography component="p">{convertToTitleCase(headerItem.header)}</Typography>
                    </StyledTableCell>
                  ))} */}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData ? (
                  displayData.map((item, index) => <CmsListItem key={`${currentItem}-${index}`} id={item.id} indexz={index} values={[item]} />)
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
