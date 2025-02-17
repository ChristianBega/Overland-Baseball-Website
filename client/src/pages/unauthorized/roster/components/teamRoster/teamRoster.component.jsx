import React, { useState } from "react";
import { Grid, Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Typography, styled, Box, Pagination } from "@mui/material";
// Components
import TeamRosterItem from "../teamRosterItem/teamRosterItem.component";
import { fetchCMSItems } from "../../../../../setup/utils/firebase/getItem";
import { useQuery } from "@tanstack/react-query";
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";

// Styled Components
const StyledTableContainer = styled(TableContainer)({
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  border: "1px solid #e0e0e0",
  width: "100%",
});

const StyledTable = styled(Table)({
  borderCollapse: "separate",
  borderSpacing: 0,
  width: "100%",
  tableLayout: "fixed",
});

const HeaderRow = styled(TableRow)({
  backgroundColor: "#1a2b4f",
});

const HeaderCell = styled(TableCell)(() => ({
  color: "#fff",
  fontWeight: 500,
  padding: "16px",
  borderBottom: "none",
  textAlign: "left",
}));

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#1a2b4f",
  color: "#fff",
});

const ItemsPerPage = styled(Typography)({
  color: "#fff",
  fontSize: "14px",
});

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "#fff",
    "&.Mui-selected": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
});

export default function TeamRoster() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const { data, isLoading, error } = useQuery({
    queryKey: ["roster"],
    queryFn: () => fetchCMSItems("roster"),
  });

  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return "error...";
  }

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRoster = data.slice(startIndex, endIndex);

  return (
    <Grid item>
      <SectionLayout id="roster-section" aria-label="Roster Section">
        <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
          Current Roster
        </Typography>

        <StyledTableContainer component={Paper}>
          <StyledTable aria-label="roster table">
            <TableHead>
              <HeaderRow>
                <HeaderCell
                  sx={{
                    paddingLeft: "1rem",
                    position: "sticky",
                    zIndex: 1,
                    width: { xs: "150px", sm: "200px", md: "300px" },
                  }}
                >
                  Name
                </HeaderCell>
                <HeaderCell>Pos</HeaderCell>
                <HeaderCell>Bat</HeaderCell>
                <HeaderCell>Thw</HeaderCell>
              </HeaderRow>
            </TableHead>
            <TableBody>
              {paginatedRoster.map((rosterItem, index) => (
                <TeamRosterItem data={rosterItem} key={index} />
              ))}
            </TableBody>
          </StyledTable>
          <PaginationContainer>
            <StyledPagination count={Math.ceil(data.length / itemsPerPage)} page={page} onChange={(e, value) => setPage(value)} size="small" />
            <ItemsPerPage>{itemsPerPage} Per Page</ItemsPerPage>
          </PaginationContainer>
        </StyledTableContainer>
      </SectionLayout>
    </Grid>
  );
}
