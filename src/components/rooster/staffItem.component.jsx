import { ListItem, ListItemText, Typography } from "@mui/material";

export default function StaffItem({ currentRooster }) {
  return (
    <>
      {currentRooster.map((teamData) => (
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", rowGap: 4, mt: { sm: 2, md: 4 } }}>
          <ListItemText primary={<Typography typography={{ sm: "bodyTextSm", lg: "bodyTextLg" }}>{`Head Coach: ${teamData.coach}`}</Typography>} />
          <ListItemText
            primary={<Typography typography={{ sm: "bodyTextSm", lg: "bodyTextLg" }}>{`Assistant Coach: ${teamData.assistantCoach}`}</Typography>}
          />
          <ListItemText
            primary={<Typography typography={{ sm: "bodyTextSm", lg: "bodyTextLg" }}>{`Team manager: ${teamData.teamManager}`}</Typography>}
          />
        </ListItem>
      ))}
    </>
  );
}
