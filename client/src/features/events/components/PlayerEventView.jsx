import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import SectionLayout from "../../ui/components/SectionLayout";
import SectionHeader from "../../ui/components/SectionHeader";
import PlayerEventToggles from "./PlayerEventToggles";
import PlayerEventCard from "./PlayerEventCard";
import { useModal } from "../../ui/context/modal.context";
import EventSignUpForm from "./EventSignUpForm";
import { NoDataDisplay, DataStateDisplay } from "../../ui";
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";

const PlayerEventView = () => {
  const theme = useTheme();
  const { openModal, closeModal } = useModal();
  const [currentSeason, setCurrentSeason] = useState("Spring");
  const { data: playerEvents, loading, error, refetch } = useStrapiCollection("events", { filters: { gameType: "Player" } });

  const handleSeasonChange = (season) => {
    setCurrentSeason(season);
  };

  const handleRegister = (eventData, season) => {
    openModal(<EventSignUpForm data={eventData} currentSeason={season} closeModal={closeModal} />);
  };

  // Filter events that have matching season data
  const filteredEvents =
    playerEvents?.filter((event) => {
      return event.seasonData?.some((season) => season.seasonName === currentSeason);
    }) || [];

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

        <DataStateDisplay
          isLoading={loading}
          isError={!!error}
          error={error}
          isEmpty={!playerEvents || playerEvents.length === 0}
          onRetry={refetch}
          loadingMessage="Loading player events..."
          errorTitle="Unable to Load Player Events"
          emptyProps={{
            title: "No Player Events Available",
            message: "Check back soon for upcoming player events!",
          }}
        >
          <PlayerEventToggles currentSeason={currentSeason} onSeasonChange={handleSeasonChange} playerEvents={playerEvents} />

          {filteredEvents.length === 0 ? (
            <Grid container justifyContent="center">
              <Grid item xs={12} md={8} lg={6}>
                <NoDataDisplay
                  title={`No Events for ${currentSeason}`}
                  message={`No events scheduled for ${currentSeason} season yet. Try another season!`}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {filteredEvents.map((event) => (
                <Grid key={event.id} item xs={12} md={4} lg={4}>
                  <PlayerEventCard playerEvent={event} currentSeason={currentSeason} onRegister={handleRegister} />
                </Grid>
              ))}
            </Grid>
          )}
        </DataStateDisplay>
      </SectionLayout>
    </Grid>
  );
};

export default PlayerEventView;
