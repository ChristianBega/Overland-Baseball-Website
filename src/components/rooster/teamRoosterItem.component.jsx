import { ListItem, ListItemText } from "@mui/material";
// Icons
import TagIcon from "@mui/icons-material/Tag";

export default function TeamRoosterItem({ currentRooster }) {
  return (
    <>
      {currentRooster.map((playerData, index) => (
        <ListItem key={index}>
          <ListItemText primary={playerData.name} sx={{ flex: 2 }} />
          <ListItemText
            sx={{ display: "flex", flex: 1 }}
            primary={<TagIcon sx={{ xs: { height: "1rem" }, md: { height: "1.5rem" } }} />}
            secondary={playerData.number}
          />
          <ListItemText primary={playerData.position} sx={{ flex: 2, textAlign: "center" }} />
          <ListItemText primary={playerData.year} sx={{ flex: 2, textAlign: "end" }} />
        </ListItem>
      ))}
    </>
  );
}
