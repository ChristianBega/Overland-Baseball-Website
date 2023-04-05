import { Avatar, Box, Stack, Typography } from "@mui/material";

export default function StaffItem({ currentRooster }) {
  return (
    <>
      {currentRooster.map((teamData) => (
        <Box key={teamData.team} sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: { xs: 5, md: 15 } }}>
          <Stack direction="column" spacing={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="h2" variant="h4" fontWeight={500}>
              Head Coach
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, minWidth: "210px" }}>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Typography typography="bodyTextLg" sx={{ fontWeight: 700, fontSize: { md: "24px" } }}>
                {teamData.coach}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="column" spacing={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="h2" variant="h4" fontWeight={500}>
              Assistant Coach
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, minWidth: "210px" }}>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Typography typography="bodyTextLg" sx={{ fontWeight: 700, fontSize: { md: "24px" } }}>
                {teamData.assistantCoach}
              </Typography>
            </Box>
          </Stack>

          {/* <Typography typography="bodyTextLg">{`Assistant Coach ${teamData.assistantCoach}`}</Typography>
          <Typography typography="bodyTextLg">{`Team manager: ${teamData.teamManager}`}</Typography> */}
        </Box>
      ))}
    </>
  );
}
