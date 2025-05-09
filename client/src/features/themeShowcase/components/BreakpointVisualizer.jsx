import React, { useState, useEffect } from "react";
import { Box, Typography, Switch, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const BreakpointVisualizer = ({ children }) => {
  const theme = useTheme();
  const [showBreakpoints, setShowBreakpoints] = useState(true);
  const [viewport, setViewport] = useState({ x: window.innerWidth, y: window.innerHeight });
  const [currentBreakpoint, setCurrentBreakpoint] = useState("xs");

  const handleToggle = () => {
    setShowBreakpoints((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewport({ x: width, y: window.innerHeight });

      const breakpoints = theme.breakpoints.values;
      console.log(breakpoints);
      if (width < breakpoints.sm) setCurrentBreakpoint("xs");
      else if (width < breakpoints.md) setCurrentBreakpoint("sm");
      else if (width < breakpoints.lg) setCurrentBreakpoint("md");
      else if (width < breakpoints.xl) setCurrentBreakpoint("lg");
      else setCurrentBreakpoint("xl");
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, [theme.breakpoints.values]);

  const breakpointColors = {
    xs: "red",
    sm: "green",
    md: "orange",
    lg: "blue",
    xl: "purple",
    xxl: "pink",
    xxxl: "yellow",
    xxxxl: "gray",
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1001,
        border: showBreakpoints ? `7px dotted ${breakpointColors[currentBreakpoint]}` : "none",
        padding: "1rem",
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          right: 10,
          backgroundColor: "background.paper",
          padding: "0.5rem",
          borderRadius: "4px",
          boxShadow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Switch checked={showBreakpoints} onChange={handleToggle} />
        <Stack direction="column">
          <Typography variant="caption" sx={{ color: breakpointColors[currentBreakpoint] }}>
            {`${currentBreakpoint}: ${`Breakpoint: ${theme.breakpoints.values[currentBreakpoint]}px`}`}
          </Typography>
          <Typography variant="caption">{`Viewport: ${viewport.x}px x ${viewport.y}px`}</Typography>
        </Stack>
      </Box>
      {children}
    </Box>
  );
};

export default BreakpointVisualizer;
