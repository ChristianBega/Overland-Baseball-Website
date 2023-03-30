// import React from "react";
import { Typography } from "@mui/material";
import TextComponent from "../reusableComponents/textComponent.component";

const boostersData = [
  {
    id: "missionStatement",
    title: "Overland Trail Blazers",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "announcements",
    title: "Booster Announcements",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "Volunteer",
    title: "How to volunteer ",
    content: "Volunteer statement content...",
  },
];

export default function BoostersTextComponents() {
  return (
    <>
      {boostersData.map((boosterData) => (
        <TextComponent location="boosters" boosterData={boosterData} key={boosterData.id} />
      ))}
    </>
  );
}
