import { TableRow, ListItemText, Typography, Grid } from "@mui/material";
import "./teamRosterItem.css";
// Icons
// import TagIcon from "@mui/icons-material/Tag";

export default function TeamRoosterItem({ currentRoster }) {
  // return (
  //   <>
  //     {currentRoster.map((playerData, index) => (
  //       <TableRow key={index} sx={{ width: "100", display: "flex", justifyContent: "space-between" }}>
  //         <TableCell>
  //         {/* <ListItemText
  //           sx={{ display: "flex", flex: 1, }}
  //           primary={<TagIcon sx={{ xs: { height: "1rem" }, md: { height: "1.5rem" } }} />}
  //         /> */}
  //         <Typography sx={{ fontSize: "1rem", color: "#fff", background: "#091F40", width: "3rem", height: "1.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>{playerData.number}</Typography>
  //         </TableCell>
  //         <TableCell style={style.tableCell}>
  //           <ListItemText style={style.playerContainer} primary={playerData.name} sx={{ flex: 2, width: "25%" }} />
  //         </TableCell>
  //         <TableCell style={style.tableCell}>
  //           <ListItemText primary={playerData.position} sx={{ flex: 2, textAlign: "center" }} />
  //         </TableCell>
  //         <TableCell style={style.tableCell}>
  //           <ListItemText primary={playerData.year} sx={{ flex: 2, textAlign: "end" }} />
  //         </TableCell>
  //       </TableRow>
  //     ))}
  //   </>
  // );
  return (
    <>
      {currentRoster.map((playerData, index) => (
        <TableRow className="rosterContainer" key={index} style={style.rosterContainer}>
          <Grid style={style.container1}>
          <Grid style={style.infoContainer}>
            <ListItemText sx={{ fontWeight: "700" }} primary={playerData.position} />
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
            <ListItemText primary={playerData.year} sx={{ flex: 2, textAlign: "end" }} />
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
    width: "100%"
  },
  playerContainer: {
    fontSize: "24px",
    color: "#666666",
    paddingLeft: "3%"
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
    alignItems: "center"
  },
  container2: {
    display: "flex",
    width: "100%",
    paddingRight: "25%"
  },
}