import React from "react";
import { SectionLayout, SectionHeader } from "../../ui";
import CustomTimeline from "./CustomTimeline";
import { useTheme } from "@emotion/react";
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";
import { DataStateDisplay } from "../../ui";

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
    const dateA = parseBirthDate(a.dateOfBirth);
    const dateB = parseBirthDate(b.dateOfBirth);
    return dateA - dateB;
  });
};

export default function TimeLine() {
  const { data, loading, error, refetch } = useStrapiCollection("alumni");

  const theme = useTheme();
  // Process and sort the timeline data
  const sortedAlumni = sortAlumniByBirthDate(data);

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

      <DataStateDisplay
        isLoading={loading}
        isError={!!error}
        error={error}
        isEmpty={!data || data.length === 0}
        onRetry={refetch}
        loadingMessage="Loading alumni..."
        errorTitle="Unable to Load Alumni"
        emptyProps={{
          title: "No Alumni Available",
          message: "No alumni are available at the moment.",
        }}
      >
        <CustomTimeline items={sortedAlumni} groupByYear={true} />
      </DataStateDisplay>
    </SectionLayout>
  );
}
