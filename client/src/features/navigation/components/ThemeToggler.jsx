import { Button, Stack } from "@mui/material";
import React, { useContext } from "react";
import { ThemeToggleContext } from "../../../setup/context/components/themeToggler.context";

const ThemeToggler = () => {
  const { toggleTheme } = useContext(ThemeToggleContext);
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="primary" size="medium" onClick={() => toggleTheme("light")}>
        Default (Light Mode)
      </Button>
      <Button variant="contained" color="primary" size="medium" onClick={() => toggleTheme("dark")}>
        Dark Mode
      </Button>
      <Button variant="contained" color="primary" size="medium" onClick={() => toggleTheme("colorblind")}>
        Colorblind Mode
      </Button>
    </Stack>
  );
};

export default ThemeToggler;
