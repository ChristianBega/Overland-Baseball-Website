// MUI components
import React, { useState, useCallback } from "react";
import { Grid, TableBody, TableHead, TableCell, Box } from "@mui/material";

// Components
import { fetchCMSItems } from "../../cms/utils/getItem";
import { useQuery } from "@tanstack/react-query";
import SectionLayout from "../../ui/components/SectionLayout";
import TextBlock from "../../ui/components/TextBlock";
import CustomPagination from "../../ui/components/Pagination";
import SearchFilterComponent from "../../ui/components/SearchFilter";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils.jsx";
import headerMap from "../data/rosterHeaderMap.config.jsx";
import { useTheme } from "@emotion/react";
import {
  StyledTableContainer,
  StyledFixedTable,
  StyledScrollableTable,
  StyledScrollContainer,
  StyledTableHeader,
  StyledTableCell,
} from "../../ui/components/DataTable";
import { StyledPlayerAvatar, StyledPlayerLink, StyledPlayerImage } from "./TeamRoster.styles";
import SectionHeader from "../../ui/components/SectionHeader";

export default function TeamRoster() {
  const theme = useTheme();
  const { isMd } = useMediaQueries();
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const {
    data: players,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["roster"],
    queryFn: () => fetchCMSItems("roster"),
  });

  // Reset to page 1 when filter changes
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

  // Function to get the first letter of player's name for avatar
  const getPlayerInitial = (name) => {
    return name.charAt(0);
  };

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPlayers = filteredData.length > 0 ? filteredData.slice(startIndex, endIndex) : players ? players.slice(startIndex, endIndex) : [];

  const checkHeaderText = (field) => {
    if (!field) return;
    return isMd ? headerMap[field].full : headerMap[field].abbr;
  };

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

        <SearchFilterComponent
          data={players || []}
          onFilteredDataChange={handleFilteredDataChange}
          filterFields={filterFields}
          customFieldLabels={customFieldLabels}
          showQuickFilters={true}
          quickFilterField="team"
          placeholder="Find a Player..."
          sx={{ width: "100%", mb: 3 }}
        />

        {/* Gray background wrapper */}
        <Box
          sx={{
            backgroundColor: "#f8f9fa",
            borderRadius: "16px",
            padding: "20px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <StyledTableContainer>
            {/* Fixed Name Column */}
            <StyledFixedTable>
              <TableHead>
                <StyledTableHeader isSplitTable={true} tableSection="fixed">
                  <TableCell
                    colSpan={2}
                    sx={{
                      borderRight: `1px solid ${theme.palette.divider}`,
                      padding: theme.spacing(2),
                      minHeight: "60px",
                      height: "60px",
                    }}
                  >
                    Name
                  </TableCell>
                </StyledTableHeader>
              </TableHead>
              <TableBody sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
                {paginatedPlayers.map((player, index) => (
                  <tr key={player.id} style={{ backgroundColor: "#f8f9fa" }}>
                    <StyledTableCell sx={{ width: 48, height: 66.5 }} index={index} length={paginatedPlayers.length}>
                      {player.playerImage ? (
                        <StyledPlayerImage src={player.playerImage} alt={player.name} />
                      ) : (
                        <StyledPlayerAvatar>{getPlayerInitial(player.name)}</StyledPlayerAvatar>
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ height: 60 }} index={index} length={paginatedPlayers.length}>
                      <StyledPlayerLink>{player.name}</StyledPlayerLink>
                    </StyledTableCell>
                  </tr>
                ))}
              </TableBody>
            </StyledFixedTable>

            {/* Scrollable Data Columns */}
            <StyledScrollContainer>
              <StyledScrollableTable>
                <TableHead>
                  <StyledTableHeader isSplitTable={true} tableSection="scrollable">
                    {["Pos", "Bat", "Thw", "Year", "Height", "Weight"].map((field) => (
                      <TableCell
                        key={field}
                        sx={{
                          padding: theme.spacing(2),
                          minHeight: "60px",
                          height: "60px",
                        }}
                      >
                        {checkHeaderText(field)}
                      </TableCell>
                    ))}
                  </StyledTableHeader>
                </TableHead>
                <TableBody>
                  {paginatedPlayers.map((player, index) => (
                    <tr key={player.id} style={{ backgroundColor: "#f8f9fa" }}>
                      <StyledTableCell sx={{ height: 66.5 }} index={index} length={paginatedPlayers.length}>
                        {player.position}
                      </StyledTableCell>
                      <StyledTableCell sx={{ height: 66.5 }} index={index} length={paginatedPlayers.length}>
                        {player.bat || "update"}
                      </StyledTableCell>
                      <StyledTableCell sx={{ height: 66.5 }} index={index} length={paginatedPlayers.length}>
                        {player.throw || "update"}
                      </StyledTableCell>
                      <StyledTableCell sx={{ height: 66.5 }} index={index} length={paginatedPlayers.length}>
                        {isMd ? player.year : player.yearAbbr}
                      </StyledTableCell>
                      <StyledTableCell sx={{ height: 66.5, minWidth: "70px" }} index={index} length={paginatedPlayers.length}>
                        {player.height}
                      </StyledTableCell>
                      <StyledTableCell sx={{ height: 66.5, minWidth: "80px" }} index={index} length={paginatedPlayers.length}>
                        {player.weight}
                      </StyledTableCell>
                    </tr>
                  ))}
                </TableBody>
              </StyledScrollableTable>
            </StyledScrollContainer>
          </StyledTableContainer>

          {/* Pagination */}
          <CustomPagination
            totalItems={players?.length || 0}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={setPage}
            setItemsPerPage={setItemsPerPage}
            itemsPerPageBase={9}
          />
        </Box>
      </SectionLayout>
    </Grid>
  );
}
