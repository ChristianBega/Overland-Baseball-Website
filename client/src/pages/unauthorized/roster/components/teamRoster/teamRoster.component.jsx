import React, { useState } from "react";
import { Grid, Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Typography, styled, Stack } from "@mui/material";
// Components
import TeamRosterItem from "../teamRosterItem/teamRosterItem.component";
import { fetchCMSItems } from "../../../../../setup/utils/firebase/getItem";
import { useQuery } from "@tanstack/react-query";
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
import CustomPagination from "../../../../../components/reusableComponents/pagination/pagination.jsx";
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

export const HeaderRow = styled(TableRow)({
  backgroundColor: "#1a2b4f",
});

const HeaderCell = styled(TableCell)(() => ({
  color: "#fff",
  fontWeight: 500,
  padding: "16px",
  borderBottom: "none",
  textAlign: "left",
}));

const StyledInput = styled("input")(({ theme }) => ({
  padding: "8px 12px",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  fontSize: "14px",
  width: "100%",
  "&:focus": {
    outline: "none",
    borderColor: "#1a2b4f",
  },
  "&::placeholder": {
    color: "#757575",
  },
}));

const StyledSelect = styled("select")(({ theme }) => ({
  padding: "8px 12px",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  fontSize: "14px",
  backgroundColor: "white",
  minWidth: "150px",
  cursor: "pointer",
  "&:focus": {
    outline: "none",
    borderColor: "#1a2b4f",
  },
}));

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
        <Stack direction="row" gap={2} alignItems="center" sx={{ mb: 2, border: "1px dotted red" }}>
          <StyledInput placeholder="Find A Player" />
          <StyledSelect defaultValue="all">
            <option value="all">All Teams</option>
            <option value="varsity">Varsity</option>
            <option value="juniorVarsity">Junior Varsity</option>
            <option value="freshman">Freshman</option>
          </StyledSelect>
        </Stack>

        <StyledTableContainer component={Paper}>
          <StyledTable aria-label="roster table">
            <TableHead>
              <HeaderRow>
                <HeaderCell
                  sx={{
                    paddingLeft: "1rem",
                    position: "sticky",
                    zIndex: 1,
                    width: { xs: "210px", sm: "225px", md: "300px" },
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
          <CustomPagination totalItems={data.length} itemsPerPage={itemsPerPage} currentPage={page} onPageChange={setPage} />
        </StyledTableContainer>
      </SectionLayout>
    </Grid>
  );
}
