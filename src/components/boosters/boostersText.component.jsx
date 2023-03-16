// import React from "react";
import TextComponent from "../reusableComponents/textComponent.component";

const boostersData = [
  {
    id: "missionStatement",
    content: "Mission statement content...",
  },
  {
    id: "announcements",
    content: "Announcements statement content...",
  },
  {
    id: "Volunteer",
    content: "Volunteer statement content...",
  },
];

export default function BoostersTextComponents() {
  return (
    <>
      {boostersData.map((boosterData) => (
        <TextComponent data={boosterData} key={boosterData.id} />
      ))}
    </>
  );
}
