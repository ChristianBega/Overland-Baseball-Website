import { TableRow, Typography, Stack, Box, TableCell, useMediaQuery } from "@mui/material";
import "./teamRosterItem.css";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-child(even)": {
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
      {currentRoster.map((playerData, index) => (
        <StyledTableRow key={index}>
          {/* <Grid style={style.container1}> */}
          {/* <Grid style={style.infoContainer}>
              <ListItemText primary={playerData.position} />
              <ListItemText>/</ListItemText>
              <ListItemText primary={playerData.height} />
              <ListItemText>/</ListItemText>
              <ListItemText primary={playerData.weight} />
              <ListItemText>/</ListItemText>
              <ListItemText primary={playerData.handed} />
            </Grid> */}
          {/* <Grid style={style.nameContainer}>
              <Typography style={style.numberContainer}>{playerData.number}</Typography>
              <Typography style={style.playerContainer} sx={{ flex: 2 }}>
                {playerData.name}
              </Typography>
            </Grid> */}
          <TableCell
            sx={{ pl: 0, pr: 2, border: "none", flex: "1 1 90px", display: "flex", justifyContent: "center", alignItems: "center" }}
            component="th"
            scope="row"
          >
            {/* <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
            <Box sx={{ width: { xs: "70px", sm: "90px" }, height: "110px", backgroundColor: "Red" }}></Box>
          </TableCell>
          <TableCell sx={{ border: "none", px: 0, flex: "3 0 62%" }} component="th" scope="row">
            <Stack direction="row" gap={1}>
              <StyledTypography>{playerData.position} |</StyledTypography>
              <StyledTypography>{playerData.height} |</StyledTypography>
              <StyledTypography>{playerData.weight} |</StyledTypography>
              <StyledTypography>{playerData.handed}</StyledTypography>
            </Stack>
            <Box
              sx={{
                // minWidth: { xs: "75vw", md: "80vw", lg: "80vw", xlg: "80vw" },
                // maxWidth: "80vw",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="row" gap={2} sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                <StyledNumberTypography>{playerData.number}</StyledNumberTypography>
                <Typography
                  typography={{ xs: "bodyTextLg" }}
                  sx={{ minWidth: { xs: "60%", lg: "350px" }, fontWeight: 700, fontSize: { md: "24px" } }}
                >
                  {playerData.name}
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
              {!isMobile_XS && playerData.year}
              {isMobile_XS && playerData.yearAbbr}
            </Typography>
          </TableCell>

          {/* <TableCell>Testing</TableCell> */}
          {/* </Grid> */}
          {/* <Grid style={style.container2}>
            <ListItemText
              primary={playerData.year}
              sx={{
                flex: 2,
                textAlign: "end",
                [theme.breakpoints.up("sm")]: {
                  paddingRight: "25%",
                },
              }}
            />
          </Grid> */}
        </StyledTableRow>
      ))}
    </>
  );
}

// const style = {
// rosterContainer: {
//   // padding: "0 2% 0 2%",
//   // height: "20vh",
//   // display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
// },
// container1: {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   width: "100%",
// },
// infoContainer: {
//   display: "flex",
//   flexDirection: "row",
// },
// nameContainer: {
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
//   width: "100%",
// },
// playerContainer: {
//   fontSize: "24px",
//   color: "#666666",
//   paddingLeft: "3%",
// },
// numberContainer: {
// fontSize: "1rem",
// fontWeight: "700",
// color: "#fff",
// background: "#091F40",
// width: "2rem",
// height: "1.5rem",
// display: "flex",
// justifyContent: "center",
// alignItems: "center",
// },
// container2: {
//   display: "flex",
//   width: "30%",
//   // paddingRight: "",
// },
// };
