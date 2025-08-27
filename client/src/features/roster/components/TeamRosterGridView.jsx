import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import PlayerCard from "./PlayerCard";

export default function TeamRosterGridView({ players }) {
  return (
    <Grid container spacing={3}>
      {players.map((player) => (
        <Grid item xs={12} sm={6} md={4} key={player.id}>
          <PlayerCard player={player} />
        </Grid>
      ))}
    </Grid>
  );
}

TeamRosterGridView.propTypes = {
  players: PropTypes.array.isRequired,
};
