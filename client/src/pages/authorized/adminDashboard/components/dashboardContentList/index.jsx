import { Box, Grid, List, Paper, Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCMSItems } from "../../../../../setup/utils/firebase/getItem";
import LoadingErrorIndicator from "../../../../loadingErrorIndicator";
import CmsListItem from "../../../contentManagementSystem/cmsListItem/cmsListItem";
import DashboardOptions from "../dashboardOptions";
import { CmsCreateItemProvider } from "../../../../../setup/context/cmsCreate.context";
import { CmsEditItemProvider } from "../../../../../setup/context/cmsEdit.context";

const DashboardContentList = ({ currentItem }) => {
  const queryKey = `${currentItem?.linkName.toLowerCase()}-cms`;

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchCMSItems(currentItem?.linkName?.toLowerCase()), // Ensure currentItem and linkName are defined
    enabled: !!currentItem?.linkName, // Prevent the query from running if currentItem or linkName is undefined/null
  });

  // let values = [{}];
  return (
    <CmsCreateItemProvider>
      <CmsEditItemProvider>
        <Grid item xs={12} lg={12}>
          <Box sx={{ border: "1px solid blue", marginTop: "2rem" }}>
            <DashboardOptions />
            <p>Search...</p>
            <div>
              <LoadingErrorIndicator isLoading={isLoading} error={error} />
              {/* <List>
                {data ? (
                  data.map((item, index) => <CmsListItem id={item.id} indexz={index} values={[item]} key={`${currentItem}-${index}`} />)
                ) : (
                  <p>No data</p>
                )}
              </List> */}
              <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table aria-label="schedule table">
                  {/* <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead> */}
                  <TableBody>
                    {data ? (
                      data.map((item, index) => <CmsListItem id={item.id} indexz={index} values={[item]} key={`${currentItem}-${index}`} />)
                    ) : (
                      <p>No data</p>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        </Grid>
      </CmsEditItemProvider>
    </CmsCreateItemProvider>
  );
};

export default DashboardContentList;
