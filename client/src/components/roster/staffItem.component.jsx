import { ListItem, ListItemText, Typography } from "@mui/material";

export default function StaffItem({ currentRooster }) {
  return (
    <>
      {currentRooster.map((teamData) => (
        <ListItem key={teamData.team} sx={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 4, mt: { sm: 2, md: 4 } }}>
          <ListItemText primary={<Typography typography="bodyTextLg">{`Head Coach: ${teamData.coach}`}</Typography>} />
          <ListItemText primary={<Typography typography="bodyTextLg">{`Assistant Coach: ${teamData.assistantCoach}`}</Typography>} />
          <ListItemText primary={<Typography typography="bodyTextLg">{`Team manager: ${teamData.teamManager}`}</Typography>} />
        </ListItem>
      ))}
    </>
  );
}
