// MUI Components
import { Grid } from "@mui/material";
import React from "react";
// Components
import SectionHeader from "../../ui/components/SectionHeader";
import StaffCard from "./StaffCard";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { Facebook, Instagram } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { StyledSectionLayoutWrapper } from "../../ui/components/SectionLayout.styles";
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";
import DataStateDisplay from "../../ui/components/DataStateDisplay";

// Mock social data for staff members
const mockStaffData = [
  {
    team: "varsity",
    coach: {
      name: "Mike Bega",
      title: "Head Coach",
      socials: [
        { name: "facebook", link: "https://www.facebook.com/profile.php?id=100063571764065", icon: Facebook },
        { name: "instagram", link: "https://www.instagram.com/mike_bega/", icon: Instagram },
      ],
    },
    assistantCoach: {
      name: "Tyler Bame",
      title: "Assistant Coach",
      socials: [{ name: "facebook", link: "https://www.facebook.com/profile.php?id=100063571764065", icon: Facebook }],
    },
    teamManager: { name: "N/A", title: "Team Manager", socials: [] },
  },
  {
    team: "jv",
    coach: { name: "JV Head Coach", title: "Head Coach", socials: [] },
    assistantCoach: { name: "JV Assistant", title: "Assistant Coach", socials: [] },
    teamManager: { name: "JV Manager", title: "Team Manager", socials: [] },
  },
  {
    team: "freshman",
    coach: { name: "Freshman Head Coach", title: "Head Coach", socials: [] },
    assistantCoach: { name: "Freshman Assistant", title: "Assistant Coach", socials: [] },
    teamManager: { name: "Freshman Manager", title: "Team Manager", socials: [] },
  },
];

const Staff = ({ currentTeam = "varsity" }) => {
  const { data: staff, loading: isLoading, error, refetch } = useStrapiCollection("rosters", { filters: { userType: "Coach" } });

  const { isLg, isTablet } = useMediaQueries();
  const theme = useTheme();

  // Determine grid spacing and columns based on breakpoints
  const getGridProps = () => {
    if (isLg) return { spacing: 4, xs: 12, sm: 6, md: 4 };
    if (isTablet) return { spacing: 3, xs: 12, sm: 6 };
    return { spacing: 2, xs: 12 };
  };

  const gridProps = getGridProps();

  const filterHeadCoachFirst = staff.filter((staff) => staff.title === "Head Coach");
  const filterAssistantCoachFirst = staff.filter((staff) => staff.title === "Assistant Coach");
  const filteredStaff = [...filterHeadCoachFirst, ...filterAssistantCoachFirst];

  return (
    <Grid item xs={12}>
      <StyledSectionLayoutWrapper id="staff-section" ariaLabel="Staff Section" marginBlock sx={{ paddingInline: "20px" }}>
        <Grid container spacing={gridProps.spacing} justifyContent="center" alignItems="center">
          {/* Section Header */}
          <Grid item xs={12}>
            <SectionHeader
              textAlign="center"
              justifyContent="center"
              title="Coaching Staff"
              // title={`${currentTeam.charAt(0).toUpperCase() + currentTeam.slice(1)} Staff`}
              subtitle="Meet our coaching team"
              color={theme.palette.secondary.main}
            />
          </Grid>

          <DataStateDisplay
            isLoading={isLoading}
            isError={!!error}
            error={error}
            isEmpty={!filteredStaff || filteredStaff.length === 0}
            onRetry={refetch}
            loadingMessage="Loading staff..."
            errorTitle={"Unable to Load Staff"}
            emptyProps={{
              title: `No ${currentTeam.charAt(0).toUpperCase() + currentTeam.slice(1)} Staff Available`,
              message: `No ${currentTeam.charAt(0).toUpperCase() + currentTeam.slice(1)} staff are available at the moment.`,
            }}
          >
            {/* Staff Cards */}
            {filteredStaff.map((staff, index) => (
              <Grid item xs={gridProps?.xs} sm={gridProps?.sm} md={gridProps?.md} key={`${staff.fullName}-${index}`}>
                <StaffCard
                  title={staff.title}
                  name={staff.fullName}
                  coachEmail={staff.coachEmail}
                  socialIcons={staff.coachEmail.length > 0 ? staff.email : undefined}
                />
              </Grid>
            ))}
          </DataStateDisplay>
        </Grid>
      </StyledSectionLayoutWrapper>
    </Grid>
  );
};

export default Staff;
