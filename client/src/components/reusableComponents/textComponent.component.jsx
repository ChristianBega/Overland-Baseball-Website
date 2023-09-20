import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationModal from "../modals/registrationModal.component";
import { eventData } from "../../websiteData/events.data";
export default function TextComponent({ boosterData, isMobile, sectionType }) {
  const [currentEventData, setCurrentEventData] = useState([]);

  useEffect(() => {
    setCurrentEventData(eventData);
  }, []);

  return (
    <>
      <Grid item xs={12} md={8} sx={{ padding: { xs: 0, md: 8 }, minHeight: { xs: "300px", lg: "500px" } }}>
        {!isMobile && <Typography typography="h2">{boosterData.title}</Typography>}
        <Typography sx={{ minHeight: "200px" }} typography={{ xs: "smallBodyText", md: "largeBodyText" }}>
          {boosterData.content}
        </Typography>
        {sectionType === "volunteer" && (
          <>
            <RegistrationModal
              currentEventData={currentEventData}
              setCurrentEventData={setCurrentEventData}
              modalType={"booster"}
              datatypeRegistration="boosters club"
            />
          </>
        )}
      </Grid>
    </>
  );
}
