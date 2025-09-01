import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Typography)(({ theme, badgeType = "primary", size = "medium" }) => {
  const baseStyles = {
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  };

  // Size variants
  const sizeStyles = {
    small: {
      padding: ".25rem .5rem",
      fontSize: "0.75rem",
    },
    medium: {
      padding: ".5rem",
      minWidth: "33px",
      minHeight: "33px",
    },
    large: {
      padding: ".75rem 1rem",
      minWidth: "45px",
      minHeight: "45px",
    },
  };

  // Type variants
  const typeStyles = {
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    secondary: {
      backgroundColor: theme.palette.background.light,
      border: `1px solid ${theme.palette.borders.primary}`,
      color: theme.palette.primary.main,
    },
    year: {
      backgroundColor: theme.palette.background.light,
      border: `1px solid ${theme.palette.borders.primary}`,
      color: theme.palette.primary.main,
      padding: ".25rem",
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...typeStyles[badgeType],
  };
});

const Badge = ({ children, badgeType = "primary", size = "medium", variant = "body2", component = "span", ...rest }) => {
  return (
    <StyledBadge variant={variant} component={component} badgeType={badgeType} size={size} {...rest}>
      {children}
    </StyledBadge>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  badgeType: PropTypes.oneOf(["primary", "secondary", "year"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.string,
  component: PropTypes.string,
};

export default Badge;
