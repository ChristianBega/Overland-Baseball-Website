// MUI Components
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Components
import SectionHeader from "../../ui/components/SectionHeader";
import StaffCard from "./StaffCard";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { Facebook, Instagram } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { StyledSectionLayoutWrapper } from "../../ui/components/SectionLayout.styles";

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
  const { isLg, isTablet } = useMediaQueries();
  const [currentStaff, setCurrentStaff] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const teamData = mockStaffData.find((team) => team.team === currentTeam);
    if (teamData) {
      // Convert team data to array of staff members, filtering out N/A entries
      const staffArray = [teamData.coach, teamData.assistantCoach, ...(teamData.teamManager?.name !== "N/A" ? [teamData.teamManager] : [])].filter(
        (staff) => staff.name && staff.name !== "N/A"
      );

      setCurrentStaff(staffArray);
    }
  }, [currentTeam]);

  // Determine grid spacing and columns based on breakpoints
  const getGridProps = () => {
    if (isLg) return { spacing: 4, xs: 12, sm: 6, md: 4 };
    if (isTablet) return { spacing: 3, xs: 12, sm: 6 };
    return { spacing: 2, xs: 12 };
  };

  const gridProps = getGridProps();

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

          {/* Staff Cards */}
          {currentStaff.map((staff, index) => (
            <Grid item xs={gridProps.xs} sm={gridProps.sm} md={gridProps.md} key={`${staff.name}-${index}`}>
              <StaffCard title={staff.title} name={staff.name} socialIcons={staff.socials.length > 0 ? staff.socials : undefined} />
            </Grid>
          ))}
        </Grid>
      </StyledSectionLayoutWrapper>
    </Grid>
  );
};

Staff.propTypes = {
  currentTeam: PropTypes.string,
};

export default Staff;
