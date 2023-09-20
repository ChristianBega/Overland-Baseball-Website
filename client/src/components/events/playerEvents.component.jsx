import { Stack, Typography, Table, TableCell, TableContainer, TableRow, TableBody, styled } from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { Box } from "@mui/system";
import Toggles from "./toggles.component";
const StyledEventInfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: ".5rem",
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
}));

const StyledEventInfoTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.accent.accentThree,
}));

export default function PlayerEvents({ currentEventData, setCurrentSeason, currentSeason, isMobile }) {
  const { date, location, time, content, contentList } = currentEventData;
  return (
    <>
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <Toggles setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} />
        </div>
      )}
      <TableContainer sx={{ mb: 4, maxWidth: "100%", height: "auto" }}>
        <Table>
          <TableBody>
            <TableRow>
              <StyledEventInfoTableCell
                sx={{
                  width: "32%",
                }}
              >
                <StyledEventInfoBox>
                  <CalendarMonthIcon />
                  {date}
                </StyledEventInfoBox>
              </StyledEventInfoTableCell>
              <StyledEventInfoTableCell
                sx={{
                  width: "41%",
                }}
              >
                <StyledEventInfoBox>
                  <PlaceIcon />
                  {location}
                </StyledEventInfoBox>
              </StyledEventInfoTableCell>
              <StyledEventInfoTableCell
                sx={{
                  width: "32%",
                }}
              >
                <StyledEventInfoBox>
                  <AccessTimeIcon />
                  {time}
                </StyledEventInfoBox>
              </StyledEventInfoTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="column" spacing={3}>
        {content?.map((text, index) => {
          return (
            <Typography key={index} typography="p" component="p">
              {text}
            </Typography>
          );
        })}
        {contentList?.map((text, index) => {
          return (
            <Typography key={index} component="small" typography="small">
              <MinimizeIcon sx={{ fontSize: "12px" }} />
              {text}
            </Typography>
          );
        })}
      </Stack>
    </>
  );
}
