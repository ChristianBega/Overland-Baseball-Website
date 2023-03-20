import React from "react";
import { Grid } from "@mui/material";

// Components
import BoostersTextComponents from "../components/boosters/boostersText.component";
import Donations from "../components/boosters/donations.component";
import Wishlist from "../components/boosters/wishlist.component";
import CashAppQRcode from "../components/boosters/cashAppQRcode.component";

export default function BoostersPage() {
  return (
    <section id="boosters-section" style={{ display: "flex", justifyContent: " center" }}>
      <Grid container maxWidth="lg" spacing={{ xs: 4, md: 6 }}>
        <BoostersTextComponents />
        <Donations />
        <CashAppQRcode />
        <Wishlist />
      </Grid>
    </section>        
  );
}
      