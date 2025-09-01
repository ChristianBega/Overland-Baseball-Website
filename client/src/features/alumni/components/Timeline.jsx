import React from "react";
import { SectionLayout, SectionHeader } from "../../ui";
import AlumniCard from "./AlumniCard";
import CustomTimeline from "./CustomTimeline";
import { useTheme } from "@emotion/react";

const timelineData = [
  {
    playerName: "Brian Givens",
    position: "Pitcher",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Nov 06 1965",
    higherLevel: "MLB",
    statsYear: "1984",
    college: "Trinidad State",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Mike Biltimier",
    position: "1st Base",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Oct 30 1970",
    higherLevel: "A+",
    statsYear: "1991",
    college: "Purdue",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Chet Justice",
    position: "Pitcher",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "x x 1971",
    higherLevel: "College",
    statsYear: "1992",
    college: "Florida, Santa Fe CC",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Tommy Schenbeck",
    position: "Pitcher",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Jun 21 1972",
    higherLevel: "A+",
    statsYear: "1992",
    college: "Palm Beach State",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Wilbert Baker",
    position: "3rd 1st Base",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Feb-27-1973",
    higherLevel: "Indy",
    statsYear: "1995",
    college: "Mesa State College",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Chris Gentner",
    position: "Pitcher",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Sep 09 1975",
    higherLevel: "Indy",
    statsYear: "1997",
    college: "Northern Colorado",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Sean Clancy",
    position: "Pitcher",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Jun 02 1982",
    higherLevel: "College",
    statsYear: "2003",
    college: "Kansas State, Lamar CC",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Kris Jiggitts",
    position: "Pitcher",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Mar 04 1986",
    higherLevel: "Indy",
    statsYear: "2009",
    college: "Colby College",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Juan Martinez",
    position: "Outside Field",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "May 24 1984",
    higherLevel: "Indy",
    statsYear: "2009",
    college: "CSU Pueblo",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Jose Clintron",
    position: "Infielder",
    gradYear_Overland: "00/00/00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Jan 11 2001",
    higherLevel: "College",
    statsYear: "2021",
    college: "Lamar",
    mlb: "Milwaukee Brewers",
  },
];

// Helper function to parse and sort birth dates
const parseBirthDate = (birthDate) => {
  if (!birthDate || birthDate.includes("x")) return new Date("1900-01-01");

  // Handle different date formats
  if (birthDate.includes("-")) {
    // Format: "Feb-27-1973"
    const [month, day, year] = birthDate.split("-");
    return new Date(`${month} ${day}, ${year}`);
  } else {
    // Format: "Nov 06 1965" or "Oct 30 1970"
    return new Date(birthDate);
  }
};

// Sort alumni by birth date (oldest to newest)
const sortAlumniByBirthDate = (alumni) => {
  return [...alumni].sort((a, b) => {
    const dateA = parseBirthDate(a.birthDate);
    const dateB = parseBirthDate(b.birthDate);
    return dateA - dateB;
  });
};

export default function TimeLine() {
  const theme = useTheme();
  // Process and sort the timeline data
  const sortedAlumni = sortAlumniByBirthDate(timelineData);

  // Prepare timeline items with AlumniCard components
  const timelineItems = sortedAlumni.map((alumni, index) => ({
    ...alumni,
    content: <AlumniCard key={`${alumni.playerName}-${index}`} alumni={alumni} />,
  }));

  return (
    <SectionLayout className="time-line" id="alumni-timeline" aria-label="Alumni Timeline">
      <SectionHeader
        title="Alumni Timeline"
        subtitle="Celebrating our baseball legacy"
        titleProps={{ variant: "h1", component: "h1" }}
        color={theme.palette.secondary.main}
        // color={theme.palette.accent.main}
        sx={{ mb: 4, textAlign: "center" }}
        justifyContent="center"
      />

      <CustomTimeline items={timelineItems} groupByYear={true} />
    </SectionLayout>
  );
}
