import React, { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../utils/theme/dark.theme";
import { defaultTheme } from "../../../utils/theme/index.theme";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { merge } from "lodash";
export const ThemeToggleContext = createContext({
  currentTheme: "light",
  toggleTheme: () => {},
});

export const ThemeToggleProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const toggleTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  const themeMap = {
    dark: darkTheme,
    // colorblind: colorBlindTheme,
    default: defaultTheme,
    // default2: mainTheme,
  };

  const value = {
    currentTheme,
    toggleTheme,
  };

  // 1. the muiContainer component from the default theme is being overridden by the dark theme.... the dark theme doesn't contain the standard muiContainer component styles because nothing changed and ideally i would like the default theme style to apply....
  const theme = createTheme(merge({}, defaultTheme, themeMap[currentTheme]));
  const globalStyles = (
    <GlobalStyles
      styles={{
        body: {
          background: theme.palette.background.default,
        },
      }}
    />
  );

  return (
    <ThemeToggleContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
