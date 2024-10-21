import styled from "@emotion/styled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
// import {
//   eventData,
//   springTryoutData,
//   fallTryoutData,
//   summerTryoutData,
//   springWorkoutsData,
//   winterWorkoutsData,
//   fallWorkoutsData,
// } from "../../websiteData/events.data";
import { useRealtimeData } from "../../hooks/useRealtimeData";

const StyledEventOptionItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const SelectInput = ({ currentEventData, setCurrentEventData, datatypeRegistration, setCurrentSeason }) => {
  // const [currentOptions, setCurrentOptions] = useState();
  const [newCurrentEventData, setNewCurrentEventData] = useState();
  // const { data: realTimeData } = useRealTimeData();
  const { data, isLoading, error } = useRealtimeData("events");

  const handleChange = useCallback(
    (event) => {
      const { eventName, location, date, time, currentSeason } = event.target.value;

      if (datatypeRegistration === "tryouts" || datatypeRegistration === "workouts") {
        setCurrentEventData({ ...data, location: location, date: date, time: time, currentSeason: currentSeason });
        setCurrentSeason(currentSeason);
      } else {
        setCurrentEventData({ event: eventName, date: date, time: time });
      }
    },
    [currentEventData, datatypeRegistration, setCurrentEventData, setCurrentSeason]
  );

  // console.log("data", data);
  // useEffect(() => {
  //   const renderOptions = () => {
  //     if (datatypeRegistration === "tryouts") {
  //       setCurrentOptions([springTryoutData, summerTryoutData, fallTryoutData]);
  //     } else if (datatypeRegistration === "workouts") {
  //       setCurrentOptions([springWorkoutsData, winterWorkoutsData, fallWorkoutsData]);
  //     } else if (datatypeRegistration === "volunteer") {
  //       setCurrentOptions(eventData);
  //     } else {
  //       setCurrentOptions(eventData);

  //       // console.log("Line 47 DatatypeRegistration", datatypeRegistration);
  //     }
  //   };
  //   renderOptions();
  // }, [datatypeRegistration]);

  useEffect(() => {
    setNewCurrentEventData(currentEventData);
  }, [handleChange, currentEventData]);

  return (
    <>
      <FormControl fullWidth labelId="demo-simple-select-label" id="event-information-form-control">
        <InputLabel id="demo-simple-select-label">Event Options</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={newCurrentEventData} label="Event Options" onChange={handleChange}>
          {data?.map((events, index) => {
            return (
              <StyledEventOptionItem onClick={handleChange} key={events.eventName + index} value={events}>
                {events?.eventName}: {events.date} {events.time}
              </StyledEventOptionItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
