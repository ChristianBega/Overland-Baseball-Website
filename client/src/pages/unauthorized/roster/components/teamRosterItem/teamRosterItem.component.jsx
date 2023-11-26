import { TableRow, Typography, Stack, Box, TableCell, useMediaQuery } from "@mui/material";
import "./teamRosterItem.styles.css";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import PlaceHolderImage from "../../../../../assets/rosterPlaceHolder.png";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-type-of(even)": {
    backgroundColor: "#f2f2f2",
  },
  boxShadow: 10,
  maxHeight: "120px",
  display: "flex",
}));

const StyledNumberTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "700",
  color: "#fff",
  background: "#091F40",
  width: "2rem",
  height: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
}));

export default function TeamRoosterItem({ currentRoster }) {
  const theme = useTheme();
  const isMobile_XS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <>
      {currentRoster.map(({ position, height, weight, handed, number, name, year, yearAbbr }, index) => (
        <StyledTableRow key={index}>
          <TableCell
            sx={{ pl: 0, pr: 2, border: "none", flex: "1 1 90px", display: "flex", justifyContent: "center", alignItems: "center" }}
            component="th"
            scope="row"
          >
            <Box component="img" src={PlaceHolderImage} sx={{ width: { xs: "70px", sm: "90px" }, height: "110px" }}></Box>
          </TableCell>
          <TableCell sx={{ border: "none", px: 0, flex: "3 0 62%" }} component="th" scope="row">
            <Stack direction="row" gap={1}>
              <StyledTypography>{position} |</StyledTypography>
              <StyledTypography>{height} |</StyledTypography>
              <StyledTypography>{weight} |</StyledTypography>
              <StyledTypography>{handed}</StyledTypography>
            </Stack>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="row" gap={2} sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                <StyledNumberTypography>{number}</StyledNumberTypography>
                <Typography
                  typography={{ xs: "bodyTextLg" }}
                  sx={{ minWidth: { xs: "60%", lg: "350px" }, fontWeight: 700, fontSize: { md: "24px" } }}
                >
                  {name}
                </Typography>
              </Stack>
            </Box>
          </TableCell>
          <TableCell
            sx={{ p: 2, border: "none", flex: "1 0 15%", display: "flex", justifyContent: "flex-start", alignItems: "end" }}
            component="th"
            scope="row"
          >
            <Typography typography={{ xs: "bodyTextLg" }} sx={{ display: "inline-block", mb: 4 }}>
              {!isMobile_XS && year}
              {isMobile_XS && yearAbbr}
            </Typography>
          </TableCell>
        </StyledTableRow>
      ))}
    </>
  );
}
