import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PlaceHolderImage from "../../../assets/coachRosterPlaceHolder.jpg";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import SectionLayout from "../../../features/ui/components/SectionLayout";

const staffData = [
  {
    team: "varsity",
    coach: "Mike Bega",
    assistantCoach: "Tyler Bame",
    teamManager: "N/A",
  },
  {
    team: "jv",
    coach: "Jv head coach",
    assistantCoach: "Jv coach name",
    teamManager: "Jv coach name",
  },
  {
    team: "freshman",
    coach: "Freshman head coach",
    assistantCoach: "coach name",
    teamManager: "coach name",
  },
];

const StaffCard = ({ title, name }) => (
  // TODO: Add a card to this, right now its just text on a white background
  <Stack direction="row" gap={4} alignItems="center" sx={{ width: "100%" }}>
    <Box
      component="img"
      src={PlaceHolderImage}
      sx={{
        width: { xs: "65px", sm: "80px", md: "90px", lg: "100px" },
        height: { xs: "65px", sm: "80px", md: "90px", lg: "100px" },
        borderRadius: "50%",
      }}
      alt={`${title} ${name}`}
    />
    <Stack direction="column" gap={1} sx={{ textAlign: "left", minWidth: "180px" }}>
      <Typography component="h3" variant="h6" fontWeight={500}>
        {title}
      </Typography>
      <Typography component="h4" variant="h4">
        {name}
      </Typography>
    </Stack>
  </Stack>
);

export default function Staff({ currentTeam }) {
  const { isSm } = useMediaQueries();
  const [currentRooster, setCurrentRooster] = useState([]);
  useEffect(() => {
    setCurrentRooster(staffData.filter((team) => team.team === currentTeam));
  }, [currentTeam]);
  return (
    <Grid item xs={12}>
      <SectionLayout id="staff-section" aria-label="Staff Section" marginBlock={true}>
        <Typography typography="h2" component="h2" variant="h2">
          {currentTeam} Staff
        </Typography>

        {currentRooster.map((teamData) => (
          <Stack direction={isSm ? "row" : "column"} spacing={4} sx={{ display: "flex" }}>
            <StaffCard title="Head Coach" name={teamData.coach} />
            <StaffCard title="Assistant Coach" name={teamData.assistantCoach} />
          </Stack>
        ))}
      </SectionLayout>
    </Grid>
  );
}
