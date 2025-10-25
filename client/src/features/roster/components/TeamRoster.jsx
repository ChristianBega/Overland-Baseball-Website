// MUI components
import React, { useState, useCallback } from "react";
import { Grid, Box, Stack } from "@mui/material";
// Components

import SectionLayout from "../../ui/components/SectionLayout";
import CustomPagination from "../../ui/components/Pagination";
import SearchFilterComponent from "../../ui/components/SearchFilter";
import { useTheme } from "@emotion/react";
import SectionHeader from "../../ui/components/SectionHeader";
import ButtonToggles from "../../ui/components/ButtonToggles";
import TeamRosterGridView from "./TeamRosterGridView.jsx";
import TeamRosterTableView from "./TeamRosterTableView.jsx";
// Context
import { ViewToggleProvider, useViewToggle } from "../../../utils/contexts/ViewToggleContext";
import { useStrapiCollection } from "../../../hooks/useStrapiCollection.jsx";
import NoDataDisplay from "../../ui/components/NoDataDisplay.jsx";
import DataStateDisplay from "../../ui/components/DataStateDisplay.jsx";

// Inner component that uses the context
const TeamRosterContent = () => {
  const theme = useTheme();
  const { view } = useViewToggle();
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const { data: players, loading: isLoading, error, refetch } = useStrapiCollection("rosters");

  const handleFilteredDataChange = useCallback((newFilteredData) => {
    setFilteredData(newFilteredData);
    setPage(1);
  }, []);

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPlayers = filteredData.length > 0 ? filteredData.slice(startIndex, endIndex) : players ? players.slice(startIndex, endIndex) : [];
  // Define filter fields and labels
  const filterFields = ["name", "position", "bat", "throw", "year", "height", "weight"];
  const customFieldLabels = {
    name: "Player Name",
    position: "Position",
    bat: "Bats",
    throw: "Throws",
    year: "Year",
    height: "Height",
    weight: "Weight",
  };

  return (
    <Grid item xs={12}>
      <SectionLayout id="roster-section" aria-label="Roster Section">
        <SectionHeader
          className="remove-uppercase"
          title="Current Roster"
          titleProps={{ component: "h1", variant: "h1" }}
          subtitle="Varsity 2025-2026"
          color={theme.palette.secondary.main}
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "flex-start", lg: "center" },
            gap: { xs: 2, lg: 0 },
          }}
        />

        <DataStateDisplay
          isLoading={isLoading}
          isError={!!error}
          error={error}
          isEmpty={!players || players.length === 0}
          onRetry={refetch}
          loadingMessage="Loading roster..."
          errorTitle="Unable to Load Roster"
          emptyProps={{
            title: "Roster Coming Soon",
            message: "Team roster will be posted soon!",
          }}
        >
          {/* Search/Filter Controls */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ gap: 2, my: 3 }}>
            <SearchFilterComponent
              data={players || []}
              onFilteredDataChange={handleFilteredDataChange}
              filterFields={filterFields}
              customFieldLabels={customFieldLabels}
              showQuickFilters={true}
              quickFilterField="team"
              placeholder="Find a Player..."
              sx={{ width: "100%" }}
            />
            <ButtonToggles />
          </Stack>

          {/* Check if filters resulted in no data */}
          {paginatedPlayers.length === 0 ? (
            <NoDataDisplay title="No Players Found" message="Try adjusting your search or filters" />
          ) : (
            <>
              {/* Table View */}
              {view === "table" && (
                <TeamRosterTableView
                  players={paginatedPlayers}
                  totalItems={(filteredData.length > 0 ? filteredData : players)?.length || 0}
                  itemsPerPage={itemsPerPage}
                  currentPage={page}
                  onPageChange={setPage}
                  setItemsPerPage={setItemsPerPage}
                />
              )}
              {/* Grid View */}
              {view === "grid" && (
                <Box>
                  <TeamRosterGridView players={paginatedPlayers} />
                  <CustomPagination
                    totalItems={players?.length || 0}
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                    onPageChange={setPage}
                    setItemsPerPage={() => {}}
                    showItemsPerPage={false}
                    isTransparent={true}
                  />
                </Box>
              )}
            </>
          )}
        </DataStateDisplay>
      </SectionLayout>
    </Grid>
  );
};

// Main component with context provider
export default function TeamRoster() {
  return (
    <ViewToggleProvider defaultView="grid">
      <TeamRosterContent />
    </ViewToggleProvider>
  );
}
