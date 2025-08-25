// MUI Components
import { IconButton, Stack, useTheme } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import React from "react";
import PropTypes from "prop-types";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const defaultIcons = [
  { name: "facebook", icon: Facebook, link: "#" },
  { name: "instagram", icon: Instagram, link: "#" },
  { name: "twitter", icon: Twitter, link: "#" },
];

const SocialIcons = ({ icons = defaultIcons, spacing = 2, size = "medium", color = "secondary.main", ...rest }) => {
  const theme = useTheme();
  const { isLg } = useMediaQueries();

  return (
    <Stack direction="row" spacing={spacing} alignItems="center" mt={isLg ? 2 : 0} mb={2} {...rest}>
      {icons.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <IconButton variant={rest.variant && rest.variant} key={social.name || index} href={social.link} size={size} sx={{ p: 1 }}>
            <IconComponent
              sx={{
                color: color.includes(".") ? theme.palette[color.split(".")[0]][color.split(".")[1]] : color,
              }}
            />
          </IconButton>
        );
      })}
    </Stack>
  );
};

SocialIcons.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.elementType.isRequired,
      link: PropTypes.string,
    })
  ),
  spacing: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
};

export default SocialIcons;
