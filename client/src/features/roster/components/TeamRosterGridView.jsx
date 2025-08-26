import React from "react";
import PropTypes from "prop-types";
import { Card, Grid, Typography } from "@mui/material";
import PlayerCard from "./PlayerCard";

export default function TeamRosterGridView({ players }) {
  return (
    <Grid container spacing={2}>
      {players.map((player) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
          <PlayerCard player={player} />
        </Grid>
      ))}
    </Grid>
  );
}

TeamRosterGridView.propTypes = {
  players: PropTypes.array.isRequired,
};
