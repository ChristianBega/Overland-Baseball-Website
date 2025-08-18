import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const useMediaQueries = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.up("xs"), {
    defaultMatches: true,
  });
  const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true,
  });
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"), {
    defaultMatches: true,
  });
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  const isLaptop = useMediaQuery(theme.breakpoints.up("laptop"), {
    defaultMatches: true,
  });
  const isLg = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const isXl = useMediaQuery(theme.breakpoints.up("xl"), {
    defaultMatches: true,
  });
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"), {
    defaultMatches: true,
  });
  const isFormHeaderAndDown = useMediaQuery(theme.breakpoints.down("formHeader"), {
    defaultMatches: true,
  });

  const isEventCalendarDown = useMediaQuery(theme.breakpoints.down("eventCalendar"), {
    defaultMatches: true,
  });

  return {
    isXs,
    isSm,
    isTablet,
    isMd,
    isLaptop,
    isLg,
    isXl,
    isSmDown,
    isMdDown,
    isLgDown,
    isEventCalendarDown,
    isFormHeaderAndDown,
  };
};

export default useMediaQueries;
