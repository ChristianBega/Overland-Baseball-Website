import React, { useState, useCallback } from "react";
import { Grid, Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Typography, Box, Stack } from "@mui/material";

// Components
import TeamRosterItem from "../teamRosterItem/teamRosterItem.component.jsx";
import { fetchCMSItems } from "../../../../setup/utils/firebase/getItem.jsx";
import { useQuery } from "@tanstack/react-query";
import SectionLayout from "../../../../components/reusableComponents/sectionLayout/sectionLayout.component.jsx";
import CustomPagination from "../../../../components/reusableComponents/pagination/pagination.jsx";
import SearchFilterComponent from "../../../../components/reusableComponents/searchFilter/searchFilter.jsx";
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils.jsx";
import headerMap from "./rosterHeaderMap.config.jsx";
import { useTheme } from "@emotion/react";
import {
  RosterContainer,
  FixedColumnTable,
  ScrollableTable,
  ScrollContainer,
  PlayerAvatar,
  PlayerLink,
  PlayerNumber,
  TableHeader,
  PlayerImage,
} from "./teamRoster.styles.jsx";

export default function TeamRoster() {
  const theme = useTheme();
  const { isMd } = useMediaQueries();
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const [filteredData, setFilteredData] = useState([]);

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
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return "error...";
  }

  // Function to get the first letter of player's name for avatar
  const getPlayerInitial = (name) => {
    return name.charAt(0);
  };

  // Function to determine row background color
  const getRowBackground = (index) => {
    return index % 2 === 0 ? "white" : "#f5f5f5";
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
  const filterFields = ["name", "position", "bats", "throws"];
  const customFieldLabels = {
    name: "Player Name",
    position: "Position",
    bats: "Bats",
    throws: "Throws",
  };

  return (
    <Grid item sx={{ overflowX: "hidden" }}>
      <SectionLayout id="roster-section" aria-label="Roster Section">
        <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
          Current Roster
        </Typography>

        <SearchFilterComponent
          data={players || []}
          onFilteredDataChange={handleFilteredDataChange}
          filterFields={filterFields}
          customFieldLabels={customFieldLabels}
          showQuickFilters={true}
          quickFilterField="team"
          placeholder="Find a player..."
          sx={{ mb: 2 }}
        />
        <Paper elevation={0} sx={{ maxWidth: "100%" }}>
          <RosterContainer>
            <Box>
              <FixedColumnTable>
                <TableHead>
                  <TableHeader>
                    <TableCell
                      colSpan={2}
                      sx={{
                        borderRight: `1px solid ${theme.palette.borders.primary}`,
                        fontWeight: "bold",
                        fontSize: "16px",
                        padding: 1.5,
                        minHeight: "61px",
                        height: "65px",
                      }}
                    >
                      NAME
                    </TableCell>
                  </TableHeader>
                </TableHead>
                <TableBody sx={{ borderRight: `1px solid ${theme.palette.borders.primary}` }}>
                  {paginatedPlayers.map((player, index) => (
                    <tr key={player.id} style={{ backgroundColor: getRowBackground(index) }}>
                      <TableCell style={{ width: 48, height: 65, verticalAlign: "middle" }}>
                        {player.playerImage ? (
                          <PlayerImage src={player.playerImage} alt={player.name} />
                        ) : (
                          <PlayerAvatar>{getPlayerInitial(player.name)}</PlayerAvatar>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          verticalAlign: "middle",
                          height: 65,
                        }}
                      >
                        <Stack direction="row" spacing={1} justifyContent="space-between">
                          <PlayerLink>{player.name}</PlayerLink>
                          <PlayerNumber>{player.number.slice(0, 2)}</PlayerNumber>
                        </Stack>
                      </TableCell>
                    </tr>
                  ))}
                </TableBody>
              </FixedColumnTable>
            </Box>

            {/* Scrollable right table with stats */}
            <ScrollContainer>
              <ScrollableTable>
                <TableHead>
                  <TableHeader>
                    <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{checkHeaderText("Pos")}</TableCell>
                    <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{checkHeaderText("Bat")}</TableCell>
                    <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{checkHeaderText("Thw")}</TableCell>
                    <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{checkHeaderText("Year")}</TableCell>
                    <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{checkHeaderText("Height")}</TableCell>
                    <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{checkHeaderText("Weight")}</TableCell>
                  </TableHeader>
                </TableHead>
                <TableBody>
                  {paginatedPlayers.map((player, index) => (
                    <tr key={player.id} style={{ backgroundColor: getRowBackground(index) }}>
                      <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{player.position}</TableCell>
                      <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{player.handed}</TableCell>
                      <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{player.handed}</TableCell>
                      <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px" }}>{isMd ? player.year : player.yearAbbr}</TableCell>
                      <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px", minWidth: "70px" }}>{player.height}</TableCell>
                      <TableCell sx={{ padding: 1.5, minHeight: "61px", height: "65px", minWidth: "80px" }}>{player.weight}</TableCell>
                    </tr>
                  ))}
                </TableBody>
              </ScrollableTable>
            </ScrollContainer>
          </RosterContainer>
          <CustomPagination totalItems={players?.length || 0} itemsPerPage={itemsPerPage} currentPage={page} onPageChange={setPage} />
        </Paper>
      </SectionLayout>
    </Grid>
  );
}
