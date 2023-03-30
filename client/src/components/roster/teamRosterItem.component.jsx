import { useTheme } from "@emotion/react";
import { TableRow, ListItemText, Typography, Grid } from "@mui/material";
import "./teamRosterItem.css";

export default function TeamRoosterItem({ currentRoster }) {
  const theme = useTheme();
  return (
    <>
      {currentRoster.map((playerData, index) => (
        <TableRow sx={{ maxHeight: "125px" }} className="rosterContainer" key={index} style={style.rosterContainer}>
          <Grid style={style.container1}>
            <Grid style={style.infoContainer}>
              <ListItemText primary={playerData.position} />
              <ListItemText>/</ListItemText>
              <ListItemText primary={playerData.height} />
              <ListItemText>/</ListItemText>
              <ListItemText primary={playerData.weight} />
              <ListItemText>/</ListItemText>
              <ListItemText primary={playerData.handed} />
            </Grid>
            <Grid style={style.nameContainer}>
              <Typography style={style.numberContainer}>{playerData.number}</Typography>
              <Typography style={style.playerContainer} sx={{ flex: 2 }}>
                {playerData.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid style={style.container2}>
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
          </Grid>
        </TableRow>
      ))}
    </>
  );
}

const style = {
  rosterContainer: {
    padding: "0 2% 0 2%",
    height: "20vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  playerContainer: {
    fontSize: "24px",
    color: "#666666",
    paddingLeft: "3%",
  },
  numberContainer: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#fff",
    background: "#091F40",
    width: "2rem",
    height: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    display: "flex",
    width: "30%",
    // paddingRight: "",
  },
};
