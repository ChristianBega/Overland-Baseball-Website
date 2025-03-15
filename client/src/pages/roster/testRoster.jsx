import React, { useState } from "react";
import { Box, Paper, TableCell, TableBody, TableHead, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCMSItems } from "../../setup/utils/firebase/getItem";
import CustomPagination from "../../components/reusableComponents/pagination/pagination";
import useMediaQueries from "../../setup/utils/helpers/useMediaQueries.utils";
import headerMap from "./components/teamRoster/rosterHeaderMap.config.jsx";
const RosterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

const FixedColumnTable = styled("table")(({ theme }) => ({
  borderCollapse: "collapse",
  tableLayout: "fixed",
  backgroundColor: theme.palette.background.paper,
  "& th, & td": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
  },
}));

const ScrollableTable = styled("table")(({ theme }) => ({
  borderCollapse: "collapse",
  tableLayout: "fixed",
  backgroundColor: theme.palette.background.paper,
  "& th, & td": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
  },
  [theme.breakpoints.up("rosterDataTable")]: {
    width: "100%",
    height: "100%",
  },
}));

const ScrollContainer = styled(Box)({
  overflowX: "auto",
  flexGrow: 1,
});

const PlayerAvatar = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
  fontWeight: "bold",
}));

const PlayerLink = styled("a")(({ theme }) => ({
  color: theme.palette.success.main,
  textDecoration: "none",
  fontWeight: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100px",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const PlayerNumber = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(0.5),
}));

const TableHeader = styled(TableRow)({
  backgroundColor: "#1a2b4f",
  "& th": {
    color: "#fff",
    fontWeight: 500,
    padding: "16px",
    borderBottom: "none",
  },
});
const PlayerImage = styled("img")({
  width: 36,
  height: 36,
  borderRadius: "50%",
  objectFit: "cover",
});

function BaseballRosterTable() {
  const theme = useTheme();
  const { isMd } = useMediaQueries();
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const {
    data: players,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["roster"],
    queryFn: () => fetchCMSItems("roster"),
  });

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
  const paginatedPlayers = players ? players.slice(startIndex, endIndex) : [];

  const checkHeaderText = (field) => {
    if (!field) return;
    return isMd ? headerMap[field].full : headerMap[field].abbr;
  };

  return (
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
                    <PlayerLink href="#">{player.name}</PlayerLink>
                    <PlayerNumber>{player.number}</PlayerNumber>
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
  );
}

export default BaseballRosterTable;
