import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledStatItem = styled(Typography)({
  width: "50%",
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
  textTransform: "capitalize",
});

const StyledStatIcon = styled("img")(({ iconSize = "medium" }) => ({
  width: iconSize === "large" ? "20px" : "18px",
  height: iconSize === "large" ? "20px" : "18px",
}));

const StatItem = ({ icon, iconAlt, iconSize = "medium", children, variant = "small", component = "span", width = "50%", ...rest }) => {
  return (
    <StyledStatItem variant={variant} component={component} sx={{ width }} {...rest}>
      {icon && <StyledStatIcon src={icon} alt={iconAlt} iconSize={iconSize} />}
      {children}
    </StyledStatItem>
  );
};

StatItem.propTypes = {
  icon: PropTypes.string,
  iconAlt: PropTypes.string,
  iconSize: PropTypes.oneOf(["small", "medium", "large"]),
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  component: PropTypes.string,
  width: PropTypes.string,
};

export default StatItem;
