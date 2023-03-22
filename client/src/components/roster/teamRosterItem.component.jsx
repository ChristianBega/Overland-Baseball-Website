import { TableRow, TableCell, ListItemText } from "@mui/material";
// Icons
import TagIcon from "@mui/icons-material/Tag";

export default function TeamRoosterItem({ currentRoster }) {
  return (
    <>
      {currentRoster.map((playerData, index) => (
        <TableRow key={index} sx={{ width: "100", display: "flex", justifyContent: "space-between" }}>
          <TableCell style={style.tableCell}>
            <ListItemText primary={playerData.name} sx={{ flex: 2, width: "25%" }} />
          </TableCell>
          <TableCell style={style.tableCell}>
          <ListItemText
            sx={{ display: "flex", flex: 1 }}
            primary={<TagIcon sx={{ xs: { height: "1rem" }, md: { height: "1.5rem" } }} />}
            secondary={playerData.number}
          />
          </TableCell>
          <TableCell style={style.tableCell}>
            <ListItemText primary={playerData.position} sx={{ flex: 2, textAlign: "center" }} />
          </TableCell>
          <TableCell style={style.tableCell}>
            <ListItemText primary={playerData.year} sx={{ flex: 2, textAlign: "end" }} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}


const style = {
  tableCell: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  }
}