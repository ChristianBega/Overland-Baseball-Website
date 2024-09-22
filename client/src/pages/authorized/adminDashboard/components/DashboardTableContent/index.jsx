import { Box, Grid, Paper, Table, TableBody, TableContainer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCMSItems, subscribeToCMSItems } from "../../../../../setup/utils/firebase/getItem"; // Import modularized functions
import LoadingErrorIndicator from "../../../../loadingErrorIndicator";
import CmsListItem from "../../../contentManagementSystem/cmsListItem/cmsListItem";
import DashboardOptions from "../dashboardOptions";
import { CmsCreateItemProvider } from "../../../../../setup/context/cmsCreate.context";
import { CmsEditItemProvider } from "../../../../../setup/context/cmsEdit.context";
import { useRealtimeData } from "../../../../../hooks/useRealtimeData";

const DashboardTableContent = ({ currentItem }) => {
  const { data: displayData, isLoading, error } = useRealtimeData(currentItem?.linkName?.toLowerCase());

  return (
    <CmsCreateItemProvider>
      <CmsEditItemProvider>
        <Grid item xs={12} lg={12}>
          <Box sx={{ border: "1px solid blue", marginTop: "2rem" }}>
            <DashboardOptions />
            <p>Search...</p>
            <div>
              <LoadingErrorIndicator isLoading={isLoading} error={error} />
              <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
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
      </CmsEditItemProvider>
    </CmsCreateItemProvider>
  );
};

export default DashboardTableContent;
