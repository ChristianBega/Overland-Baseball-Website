// MUI components
import React, { useState, useCallback } from "react";
import { Grid, Box, Stack } from "@mui/material";
// Components

import SectionLayout from "../../ui/components/SectionLayout";
import TextBlock from "../../ui/components/TextBlock";
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

// Inner component that uses the context
const TeamRosterContent = () => {
  const theme = useTheme();
  const { view } = useViewToggle();
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const { data: players, loading: isLoading, error } = useStrapiCollection("rosters");

  const handleFilteredDataChange = useCallback((newFilteredData) => {
    setFilteredData(newFilteredData);
    setPage(1);
  }, []);

  if (isLoading) {
    return (
      <TextBlock direction="row" justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        Loading...
      </TextBlock>
    );
  }

  if (error) {
    return "error...";
  }

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
        {/* Table View */}
        {view === "table" && (
          <>
            <TeamRosterTableView
              players={paginatedPlayers}
              // Pass pagination props
              totalItems={(filteredData.length > 0 ? filteredData : players)?.length || 0}
              itemsPerPage={itemsPerPage}
              currentPage={page}
              onPageChange={setPage}
              setItemsPerPage={setItemsPerPage}
            />
          </>
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
