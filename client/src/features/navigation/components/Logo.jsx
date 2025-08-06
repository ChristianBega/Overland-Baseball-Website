import React from "react";
import { Link as RouterLink } from "react-router-dom";
// Assets
import Logo from "../../../assets/overlandLogo2.webp";
// Styled Components
import { StyledLogoLink, StyledLogoContainer, StyledLogoImage } from "./Logo.styles";

export default function OverlandLogo() {
  return (
    <StyledLogoLink component={RouterLink} to="/">
      <StyledLogoContainer>
        <StyledLogoImage component="img" src={Logo} />
      </StyledLogoContainer>
    </StyledLogoLink>
  );
}
