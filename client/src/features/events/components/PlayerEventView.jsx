import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import SectionLayout from "../../ui/components/SectionLayout";
import SectionHeader from "../../ui/components/SectionHeader";
import PlayerEventToggles from "./PlayerEventToggles";
import PlayerEventCard from "./PlayerEventCard";
import { useModal } from "../../ui";
import EventSignUpForm from "./EventSignUpForm";
import NoDataDisplay from "../../ui/components/NoDataDisplay";

const PlayerEventView = ({ playerEvents = [] }) => {
  const theme = useTheme();
  const { openModal, closeModal } = useModal();
  const [currentSeason, setCurrentSeason] = useState("Spring");

  const handleSeasonChange = (season) => {
    setCurrentSeason(season);
  };

  const handleRegister = (eventData, season) => {
    openModal(<EventSignUpForm data={eventData} currentSeason={season} closeModal={closeModal} />);
  };

  // Filter events that have matching season data
  const filteredEvents = playerEvents.filter((event) => {
    return event.seasonData?.some((season) => season.seasonName === currentSeason);
  });

  return (
    <Grid item xs={12}>
      <SectionLayout id="player-events-section" aria-label="Player Events Section">
        <SectionHeader
          title="Player Events"
          subtitle="Come Support Your Players"
          color={theme.palette.secondary.main}
          textAlign="center"
          justifyContent="center"
        />

        <PlayerEventToggles currentSeason={currentSeason} onSeasonChange={handleSeasonChange} playerEvents={playerEvents} />

        <Grid container spacing={2}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Grid key={event.id} item xs={12} md={4} lg={4}>
                <PlayerEventCard playerEvent={event} currentSeason={currentSeason} onRegister={handleRegister} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} md={8} lg={6}>
              <NoDataDisplay title="No Events Available" message="Check back soon for updates!" />
            </Grid>
          )}
        </Grid>

        {filteredEvents.length === 0 && (
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
              <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ py: 4 }}>
                No events scheduled for {currentSeason} season yet. Check back soon!
              </Typography>
            </Grid>
          </Grid>
        )}
      </SectionLayout>
    </Grid>
  );
};

export default PlayerEventView;
