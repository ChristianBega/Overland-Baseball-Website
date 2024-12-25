import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Container,
  Button,
  Stack,
  IconButton,
  Link,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import BreakpointVisualizer from "./breakpointVisualizer";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ThemeToggler from "../../components/navigation/components/themeToggler/themeToggler";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Icons
//  TODO: Add enable breakpoints - change border colors + tag in top right corner showing each breakpoint
// TODO: Add more components to the components section - start with buttons, inputs, then identify what we use on the site and what we should have by default (or we would like to style by default all others we  will just have mui defaults)
// TODO: Add more gradients section - create gradient for each color that is linear and radial by default just to have incase?
const mockOptions = ["Standard", "Filled", "Outlined", "Disabled"];
const isLightColor = (color) => {
  if (typeof color !== "string") {
    return false; // Return false if color is not a string
  }

  let r,
    g,
    b,
    a = 1; // Default alpha to 1 (fully opaque)

  if (color.startsWith("#")) {
    if (color.length === 4) {
      const hex = color.slice(1);
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (color.length === 7) {
      const hex = color.slice(1);
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else if (color.length === 9) {
      // Handle hex with alpha (#ffffffa8)
      const hex = color.slice(1);
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16) / 255;
    }
  } else if (color.startsWith("rgba")) {
    const rgbaValues = color.match(/\d+(\.\d+)?/g);
    r = parseInt(rgbaValues[0], 10);
    g = parseInt(rgbaValues[1], 10);
    b = parseInt(rgbaValues[2], 10);
    a = parseFloat(rgbaValues[3]);
  } else if (color.startsWith("rgb")) {
    const rgbValues = color.match(/\d+/g);
    r = parseInt(rgbValues[0], 10);
    g = parseInt(rgbValues[1], 10);
    b = parseInt(rgbValues[2], 10);
  } else {
    return false; // Default to false if color format is not recognized
  }

  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // Adjust luminance based on alpha
  const adjustedLuminance = luminance * a + 255 * (1 - a);
  return adjustedLuminance > 200; // Threshold for light color
};

const iconButtonConfigs = [
  {
    header: "Small Icon Buttons",
    buttons: [
      { variant: "contained", size: "small", color: "primary", icon: <MenuIcon /> },
      { variant: "outlined", size: "small", color: "primary", icon: <FacebookIcon /> },
      { variant: "contained", size: "small", color: "primary", icon: <GoogleIcon /> },
      { variant: "outlined", size: "small", color: "primary", icon: <PhoneIcon /> },
      { variant: "contained", size: "small", color: "primary", icon: <EmailIcon /> },
      { variant: "outlined", size: "small", color: "primary", icon: <HomeIcon /> },
    ],
  },
  {
    header: "Medium Icon Buttons",
    buttons: [
      { variant: "contained", size: "medium", color: "primary", icon: <MenuIcon /> },
      { variant: "outlined", size: "medium", color: "primary", icon: <FacebookIcon /> },
      { variant: "contained", size: "medium", color: "primary", icon: <GoogleIcon /> },
      { variant: "outlined", size: "medium", color: "primary", icon: <PhoneIcon /> },
      { variant: "contained", size: "medium", color: "primary", icon: <EmailIcon /> },
      { variant: "outlined", size: "medium", color: "primary", icon: <HomeIcon /> },
    ],
  },
  {
    header: "Large Icon Buttons",
    buttons: [
      { variant: "contained", size: "large", color: "primary", icon: <MenuIcon /> },
      { variant: "outlined", size: "large", color: "primary", icon: <FacebookIcon /> },
      { variant: "contained", size: "large", color: "primary", icon: <GoogleIcon /> },
      { variant: "outlined", size: "large", color: "primary", icon: <PhoneIcon /> },
      { variant: "contained", size: "large", color: "primary", icon: <EmailIcon /> },
      { variant: "outlined", size: "large", color: "primary", icon: <HomeIcon /> },
    ],
  },
];
const buttonConfigs = [
  {
    header: "Small Button",
    buttons: [
      { variant: "contained", size: "small", label: "Sign In" },
      { variant: "outlined", size: "small", label: "Sign In" },
      { variant: "contained", size: "small", color: "secondary", label: "Sign In" },
      { variant: "outlined", size: "small", color: "secondary", label: "Sign In" },
    ],
  },
  {
    header: "Medium Button",
    buttons: [
      { variant: "contained", size: "medium", label: "Sign In" },
      { variant: "outlined", size: "medium", label: "Sign In" },
      { variant: "contained", size: "medium", color: "secondary", label: "Sign In" },
      { variant: "outlined", size: "medium", color: "secondary", label: "Sign In" },
    ],
  },
  {
    header: "Large Button",
    buttons: [
      { variant: "contained", size: "large", label: "Sign Up Today!" },
      { variant: "outlined", size: "large", label: "Sign Up Today!" },
      { variant: "contained", size: "large", color: "secondary", label: "Sign Up Today!" },
      { variant: "outlined", size: "large", color: "secondary", label: "Sign Up Today!" },
    ],
  },
  // {
  //   header: "Box Button",
  //   buttons: [
  //     { variant: "contained", size: "box", label: "Sign Up Today!" },
  //     { variant: "outlined", size: "box", label: "Sign Up Today!" },
  //     { variant: "contained", size: "box", color: "secondary", label: "Sign Up Today!" },
  //     { variant: "outlined", size: "box", color: "secondary", label: "Sign Up Today!" },
  //   ],
  // },
  {
    header: "Circle Button",
    buttons: [
      { variant: "contained", size: "circle", label: "X" },
      { variant: "outlined", size: "circle", label: "X" },
      { variant: "contained", size: "circle", color: "secondary", label: "X" },
      { variant: "outlined", size: "circle", color: "secondary", label: "X" },
    ],
  },
];
const iconConfigs = [
  {
    header: "Small Icons",
    icons: [
      { icon: <MenuIcon sx={{ fontSize: 18 }} />, label: "Menu" },
      { icon: <FacebookIcon sx={{ fontSize: 18 }} />, label: "Facebook" },
      { icon: <GoogleIcon sx={{ fontSize: 18 }} />, label: "Google" },
      { icon: <PhoneIcon sx={{ fontSize: 18 }} />, label: "Phone" },
      { icon: <EmailIcon sx={{ fontSize: 18 }} />, label: "Email" },
      { icon: <AddIcon sx={{ fontSize: 18 }} />, label: "Add" },
      { icon: <HomeIcon sx={{ fontSize: 18 }} />, label: "Home" },
      { icon: <FormatListNumberedIcon sx={{ fontSize: 18 }} />, label: "List" },
    ],
  },
  {
    header: "Medium Icons",
    icons: [
      { icon: <MenuIcon sx={{ fontSize: 24 }} />, label: "Menu" },
      { icon: <FacebookIcon sx={{ fontSize: 24 }} />, label: "Facebook" },
      { icon: <GoogleIcon sx={{ fontSize: 24 }} />, label: "Google" },
      { icon: <PhoneIcon sx={{ fontSize: 24 }} />, label: "Phone" },
      { icon: <EmailIcon sx={{ fontSize: 24 }} />, label: "Email" },
      { icon: <AddIcon sx={{ fontSize: 24 }} />, label: "Add" },
      { icon: <HomeIcon sx={{ fontSize: 24 }} />, label: "Home" },
      { icon: <FormatListNumberedIcon sx={{ fontSize: 24 }} />, label: "List" },
    ],
  },
  {
    header: "Large Icons",
    icons: [
      { icon: <MenuIcon sx={{ fontSize: 28 }} />, label: "Menu" },
      { icon: <FacebookIcon sx={{ fontSize: 28 }} />, label: "Facebook" },
      { icon: <GoogleIcon sx={{ fontSize: 28 }} />, label: "Google" },
      { icon: <PhoneIcon sx={{ fontSize: 28 }} />, label: "Phone" },
      { icon: <EmailIcon sx={{ fontSize: 28 }} />, label: "Email" },
      { icon: <AddIcon sx={{ fontSize: 28 }} />, label: "Add" },
      { icon: <HomeIcon sx={{ fontSize: 28 }} />, label: "Home" },
      { icon: <FormatListNumberedIcon sx={{ fontSize: 28 }} />, label: "List" },
    ],
  },
];
const linkConfig = [
  {
    links: [
      { href: "#", label: "Home", variant: "body1" },
      { href: "#", label: "About", variant: "body1" },
      { href: "#", label: "Services", variant: "body1" },
      { href: "#", label: "Contact", variant: "body1" },
    ],
  },
];
const inputConfigs = [
  {
    header: "Text Inputs",
    inputs: [
      { type: "text", label: "Standard", variant: "standard" },
      { type: "text", label: "Filled", variant: "filled" },
      { type: "text", label: "Outlined", variant: "outlined" },
      { type: "text", label: "Disabled", disabled: true, variant: "outlined" },
    ],
  },
  {
    header: "Select Inputs",
    inputs: [
      { type: "select", label: "Standard", variant: "standard" },
      { type: "select", label: "Filled", variant: "filled" },
      { type: "select", label: "Outlined", variant: "outlined" },
      { type: "select", label: "Disabled", disabled: true, variant: "outlined" },
    ],
  },
  {
    header: "Date Inputs",
    inputs: [
      { type: "date", label: "Standard", variant: "standard" },
      { type: "date", label: "Filled", variant: "filled" },
      { type: "date", label: "Outlined", variant: "outlined" },
      { type: "date", label: "Disabled", disabled: true, variant: "outlined" },
    ],
  },
  {
    header: "Time Inputs",
    inputs: [
      { type: "time", label: "Standard", variant: "standard" },
      { type: "time", label: "Filled", variant: "filled" },
      { type: "time", label: "Outlined", variant: "outlined" },
      { type: "time", label: "Disabled", disabled: true, variant: "outlined" },
    ],
  },
  {
    header: "Password Inputs",
    inputs: [
      { type: "password", label: "Standard", variant: "standard" },
      { type: "password", label: "Filled", variant: "filled" },
      { type: "password", label: "Outlined", variant: "outlined" },
      { type: "password", label: "Disabled", disabled: true, variant: "outlined" },
    ],
  },
  {
    header: "Message Inputs",
    inputs: [
      { type: "text", label: "Standard", multiline: true, rows: 4, variant: "standard" },
      { type: "text", label: "Filled", multiline: true, rows: 4, variant: "filled" },
      { type: "text", label: "Outlined", multiline: true, rows: 4, variant: "outlined" },
      { type: "text", label: "Disabled", disabled: true, multiline: true, rows: 4, variant: "outlined" },
    ],
  },
];
const ThemeShowcase = () => {
  const theme = useTheme();
  const [showPasswords, setShowPasswords] = useState(inputConfigs.map(({ inputs }) => inputs.map(() => false)));

  const handleTogglePasswordVisibility = (configIndex, inputIndex) => {
    setShowPasswords((prev) =>
      prev.map((config, cIndex) => (cIndex === configIndex ? config.map((show, iIndex) => (iIndex === inputIndex ? !show : show)) : config))
    );
  };

  const renderSection = (title, filterOptions, themeProperty) => {
    if (!filterOptions) return;
    const entries = Object.entries(theme[themeProperty]).filter(([key]) => filterOptions.includes(key));
    return (
      <Container>
        <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
          {title}
        </Typography>
        {entries.map(([key, value]) => {
          if (typeof value === "object" && themeProperty === "palette") {
            return (
              <Box key={key} sx={{ marginBottom: "2rem" }}>
                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(value)
                    .filter(([subKey, subValue]) => subKey !== "contrastText" && typeof subValue === "string")
                    .map(([subKey, subValue]) => (
                      <Grid item xs={12} sm={6} md={3} key={`${key}-${subKey}`}>
                        <Card
                          sx={{
                            backgroundColor: subValue,
                            color: isLightColor(subValue) ? "#000" : "#fff",
                            textAlign: "center",
                            padding: "1rem",
                          }}
                        >
                          <CardContent sx={{ color: isLightColor(subValue) ? "#000 !important" : "#fff !important" }}>
                            <Typography variant="body1">{`${key}.${subKey}`}</Typography>
                            <Typography variant="body2">{subValue}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            );
          } else if (themeProperty === "typography") {
            return (
              <Grid item xs={12} key={key}>
                <Typography variant={key} sx={value}>
                  {key}
                </Typography>
              </Grid>
            );
          }
          return null;
        })}
        <Divider sx={{ margin: "1.5rem 0" }} />
      </Container>
    );
  };
  return (
    <>
      {/* <BreakpointVisualizer /> */}
      {/* Typography Section */}
      <Container>
        <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
          Toggle Themes
        </Typography>
        <ThemeToggler />
      </Container>
      {/* "body1", "body2", */}
      {renderSection(
        "Typography",
        ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "button", "caption", "overline", "p"],
        "typography"
      )}

      {/* Colors Section */}
      {renderSection(
        "Colors",
        ["accent", "background", "borders", "grey", "info", "primary", "secondary", "succession", "text", "warning"],
        "palette"
      )}
      {/* Colors Misc Section */}
      {renderSection("Colors Misc", ["action", "common"], "palette")}
      {/* Components Section */}
      <Container>
        <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
          Buttons
        </Typography>
        {iconButtonConfigs.map(({ header, buttons }, index) => (
          <Box key={index}>
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
              {header}
            </Typography>
            <Stack direction="row" spacing={2}>
              {buttons.map(({ variant, size, color, label, icon }, btnIndex) => (
                <>
                  {label}{" "}
                  <IconButton key={btnIndex} variant={variant} size={size} color={color}>
                    {icon}
                  </IconButton>
                </>
              ))}
            </Stack>
          </Box>
        ))}

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {buttonConfigs.map(({ header, buttons }, index) => (
            <Box key={index}>
              <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                {header}
              </Typography>
              <Stack direction="row" spacing={2}>
                {buttons.map(({ variant, size, color, label }, btnIndex) => (
                  <Button key={btnIndex} variant={variant} size={size} color={color}>
                    {label}
                  </Button>
                ))}
              </Stack>
            </Box>
          ))}
          <Divider sx={{ margin: "1.5rem 0" }} />
        </Box>
        <Typography variant="h2" sx={{ marginTop: "1rem" }}>
          Inputs
        </Typography>
        {inputConfigs.map(({ header, inputs }, configIndex) => (
          <React.Fragment key={configIndex}>
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
              {header}
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: "3rem" }}>
              {inputs.map(({ type, label, variant, disabled, multiline, rows }, inputIndex) => (
                <Grid item xs={12} key={inputIndex}>
                  {type === "password" ? (
                    <TextField
                      type={showPasswords[configIndex][inputIndex] ? "text" : "password"}
                      label={label}
                      variant={variant}
                      disabled={disabled}
                      multiline={multiline}
                      rows={rows}
                      InputProps={{
                        endAdornment: (
                          <IconButton disabled={disabled} size="small" onClick={() => handleTogglePasswordVisibility(configIndex, inputIndex)}>
                            {showPasswords[configIndex][inputIndex] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        ),
                      }}
                    />
                  ) : (
                    <>
                      <TextField
                        key={inputIndex}
                        type={type}
                        label={type === "date" || type === "time" ? null : label}
                        variant={variant}
                        disabled={disabled}
                        multiline={multiline}
                        rows={rows}
                        select={type === "select"}
                        options={type === "select" ? mockOptions : null}
                      >
                        {type === "select"
                          ? mockOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))
                          : null}
                      </TextField>
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        ))}
        <Divider sx={{ margin: "1.5rem 0" }} />
        <Typography variant="h2" sx={{ marginTop: "1rem" }}>
          Cards
        </Typography>
        <Divider sx={{ margin: "1.5rem 0" }} />
        <Typography variant="h2" sx={{ marginTop: "1rem" }}>
          Links
        </Typography>
        {linkConfig.map(({ header, links }, index) => (
          <Box key={index}>
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
              {header}
            </Typography>
            <Stack direction="row" spacing={2}>
              {links.map(({ href, label, variant }, linkIndex) => (
                <Link key={linkIndex} href={href} variant={variant}>
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>
        ))}
        <Divider sx={{ margin: "1.5rem 0" }} />
        <Typography variant="h2" sx={{ marginTop: "1rem" }}>
          Icons
        </Typography>
        {iconConfigs.map(({ header, icons }, index) => (
          <Box key={index}>
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
              {header}
            </Typography>
            <Stack direction="row" spacing={2}>
              {icons.map(({ icon, label }, iconIndex) => (
                <Box key={iconIndex}>
                  {/* <Typography variant="small">{label}</Typography> */}
                  {icon}
                </Box>
              ))}
            </Stack>
          </Box>
        ))}

        <Divider sx={{ margin: "1.5rem 0" }} />
        <Typography variant="h2" sx={{ marginTop: "1rem" }}>
          Custom Components
        </Typography>
        <Divider sx={{ margin: "1.5rem 0" }} />
      </Container>
    </>
  );
};

export default ThemeShowcase;
