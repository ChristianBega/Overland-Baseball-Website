import React from "react";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import BentoLayout from "../../../components/reusableComponents/bentoLayout/bentoLayout.component";
import { Box, Container } from "@mui/material";
const ManagePages = () => {
  //1. fetch all events
  //2. sort events by eventType : featured, regular, player
  //3. render in the bentoLayout for feature and regular
  //4. render in a playerEvents component for player
  const { data, isLoading, error } = useRealtimeData("events");

  // filter this data by eventType
  const featuredEvents = data?.filter((event) => event.eventType === "featured");
  const fundraiserEvents = data?.filter((event) => event.eventType === "fundraiser");
  const playerEvents = data?.filter((event) => event.eventType === "player");

  if (isLoading) return "loading...";
  if (error) return "error...";
  return (
    <Container maxWidth="xl" sx={{ height: "2000px" }}>
      {" "}
      <BentoLayout gridItemsData={featuredEvents} />
      <Box sx={{ minHeight: "150px" }}></Box>
      <BentoLayout gridItemsData={fundraiserEvents} />
    </Container>
  );
};

export default ManagePages;
