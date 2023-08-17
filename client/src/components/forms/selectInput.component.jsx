import styled from "@emotion/styled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  eventData,
  springTryoutData,
  fallTryoutData,
  summerTryoutData,
  springWorkoutsData,
  summerWorkoutsData,
  fallWorkoutsData,
} from "../../websiteData/events.data";

const StyledEventOptionItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const SelectInput = ({ currentEventData, setCurrentEventData, datatypeRegistration, setCurrentSeason }) => {
  const [currentOptions, setCurrentOptions] = useState();
  const [newCurrentEventData, setNewCurrentEventData] = useState();

  const handleChange = useCallback(
    (event) => {
      const { eventName, location, date, time, currentSeason } = event.target.value;

      if (datatypeRegistration === "tryouts" || datatypeRegistration === "workouts") {
        setCurrentEventData({ ...currentEventData, location: location, date: date, time: time, currentSeason: currentSeason });
        setCurrentSeason(currentSeason);
      } else {
        setCurrentEventData({ event: eventName, date: date, time: time });
        setCurrentSeason(currentSeason);
      }
    },
    [currentEventData, datatypeRegistration, setCurrentEventData, setCurrentSeason]
  );

  useEffect(() => {
    const renderOptions = () => {
      if (datatypeRegistration === "tryouts") {
        setCurrentOptions([springTryoutData, summerTryoutData, fallTryoutData]);
      } else if (datatypeRegistration === "workouts") {
        setCurrentOptions([springWorkoutsData, summerWorkoutsData, fallWorkoutsData]);
      } else if (datatypeRegistration === "volunteer") {
        setCurrentOptions(eventData);
      } else {
        console.log("Line 47 DatatypeRegistration", datatypeRegistration);
      }
    };
    renderOptions();
  }, [datatypeRegistration]);

  useEffect(() => {
    setNewCurrentEventData(currentEventData);
  }, [handleChange, currentEventData]);

  return (
    <>
      <FormControl fullWidth labelId="demo-simple-select-label" id="event-information-form-control">
        <InputLabel id="demo-simple-select-label">Event Options</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={newCurrentEventData} label="Event Options" onChange={handleChange}>
          {currentOptions?.map((events, index) => {
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
