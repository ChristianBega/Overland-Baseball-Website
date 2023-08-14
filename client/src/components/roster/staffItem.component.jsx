import { Box, Stack, Typography } from "@mui/material";
import PlaceHolderImage from "../../assets/coachRosterPlaceHolder.jpg";
export default function StaffItem({ currentRooster }) {
  return (
    <>
      {currentRooster.map((teamData) => (
        <Box key={teamData.team} sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: { xs: 5, md: 15 } }}>
          <Stack direction="row" spacing={4} sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" src={PlaceHolderImage} sx={{ width: "80px", height: "110px" }}></Box>
            <Stack direction="column" gap={3} sx={{ textAlign: "left", minWidth: "180px" }}>
              <Typography component="h2" variant="h6" fontWeight={500}>
                Head Coach
              </Typography>
              <Typography typography="bodyTextLg" sx={{ fontWeight: 700, fontSize: { md: "24px" } }}>
                {teamData.coach}
              </Typography>
              <Typography>Contact</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" src={PlaceHolderImage} sx={{ width: "80px", height: "110px" }}></Box>
            <Stack direction="column" gap={3} sx={{ textAlign: "left", minWidth: "180px" }}>
              <Typography component="h2" variant="h6" fontWeight={500}>
                Assistant Coach
              </Typography>
              <Typography typography="bodyTextLg" sx={{ fontWeight: 700, fontSize: { md: "24px" } }}>
                {teamData.assistantCoach}
              </Typography>
              <Typography>Contact</Typography>
            </Stack>
          </Stack>

          {/* <Typography typography="bodyTextLg">{`Assistant Coach ${teamData.assistantCoach}`}</Typography>
          <Typography typography="bodyTextLg">{`Team manager: ${teamData.teamManager}`}</Typography> */}
        </Box>
      ))}
    </>
  );
}
