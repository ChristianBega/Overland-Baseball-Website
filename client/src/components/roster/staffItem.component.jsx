import { TableRow, Typography } from "@mui/material";

export default function StaffItem({ currentRooster }) {
  return (
    <>
    {currentRooster.map((teamData) => (
      <TableRow key={teamData.team} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", rowGap: 4, mt: { sm: 2, md: 3 } }}>
          <Typography typography="bodyTextLg">{`Head Coach: ${teamData.coach}`}</Typography>
          <Typography typography="bodyTextLg">{`Assistant Coach: ${teamData.assistantCoach}`}</Typography>
          <Typography typography="bodyTextLg">{`Team manager: ${teamData.teamManager}`}</Typography>
      </TableRow>
      ))}
    </>
  )
}
