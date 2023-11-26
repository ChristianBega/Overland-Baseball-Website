import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "../playerEvents/playerEvents.component";
import RegistrationModal from "../../../../../components/modals/registrationModal.component";
import { youthProgramData } from "../../../../../websiteData/events.data";

const StyledInfoBox = styled(Box)(({ theme }) => ({
  minWidth: "350px",
  maxWidth: "600px",
  minHeight: "100%",
  margin: "auto",
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "center",
}));

export default function YouthProgram({ isMobile }) {
  const [currentEventData, setCurrentEventData] = useState([]);

  useEffect(() => {
    setCurrentEventData(youthProgramData);
  }, [currentEventData]);

  return (
    <Grid item xs={12} md={8} sx={{ padding: { xs: 0, md: 8 } }}>
      <StyledInfoBox>
        {!isMobile && <Typography typography="h2">Youth Program</Typography>}
        <PlayerEvents currentEventData={currentEventData} />
        <RegistrationModal currentEventData={currentEventData} datatypeRegistration="youth program" />
      </StyledInfoBox>
    </Grid>
  );
}
