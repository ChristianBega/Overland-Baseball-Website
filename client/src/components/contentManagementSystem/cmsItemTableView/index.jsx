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
import { convertToTitleCase } from "../../../setup/utils/helpers/convertText";
import { StyledTableCell } from "../../../styles/index.styles";
import CmsTableViewHeader from "./components/cmsTableViewHeader/cmsTableViewHeader";
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";

const CmsItemTableView = ({ currentItem }) => {
  const theme = useTheme();
  const { handleSelectAll, selectedItems } = useContext(CmsBulkActionContext);
  const { editableItemData } = useContext(CmsEditItemContext);
  const { data: displayData, isLoading, error } = useRealtimeData(currentItem?.linkName?.toLowerCase());
  const currentMenuItemType = currentItem?.linkName || "";
  const { isSm } = useMediaQueries();
  const tableHeaders = displayData;

  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid item xs={12} lg={12}>
      <Box sx={{ marginTop: "2rem" }}>
        <Stack direction={isSm ? "row" : "column"} justifyContent="space-between" spacing={2} sx={{ marginBottom: "1rem" }}>
          <CmsOptionsPanel />
          <InputFieldComponent type="text" placeholder="Search..." disabled />
        </Stack>
        <div>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table aria-label="cms table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="table-header-cell table-header-cell-narrow">
                    <InputFieldComponent
                      disabled={editableItemData}
                      type="checkbox"
                      checked={displayData?.length > 0 ? displayData?.length === selectedItems?.length : selectedItems?.length > 0}
                      onChange={(event) => handleSelectAll(event, displayData)}
                    />
                  </StyledTableCell>
                  {/* <TableHeaders tableHeaders={displayData} /> */}
                  <CmsTableViewHeader />
                  {/* {tableHeaders?.map((headerItem, index) => (
                    <StyledTableCell className={`table-header-cell ${headerItem.className}`} key={index}>
                      <Typography component="p">{headerItem.header}</Typography>
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

// const requiredFields = ["date", "time", "opponent", "location"];
// const TableHeaders = (tableHeaders) => {
//   const { editableItemData } = useContext(CmsEditItemContext);
//   return tableHeaders?.map((headerItem, index) => (
//     <>
//       {editableItemData && (
//         <>
//           <StyledTableCell className="table-header-cell table-header-cell-narrow">
//             <Typography component="p">Edit</Typography>
//           </StyledTableCell>
//         </>
//       )}

//       {editableItemData && (
//         <>
//           <StyledTableCell className="table-header-cell table-header-cell-narrow">
//             <Typography component="p">Delete</Typography>
//           </StyledTableCell>
//         </>
//       )}
//     </>
//   ));
// };
