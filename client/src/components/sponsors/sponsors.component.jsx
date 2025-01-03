import React, { useEffect, useState } from "react";
// Framer Motion
import { AnimatePresence } from "framer-motion";
// MUI
import { Grid } from "@mui/material";
// Components
import SectionLayout from "../reusableComponents/sectionLayout/sectionLayout.component";
// Data
import { sponsorData } from "../../websiteData/sponsors.data";
import { StyledImageContainer, StyledSponsorImage } from "./sponsors.styles";

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sponsorData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid item xs={12}>
      <SectionLayout id="sponsors-section" aria-label="Sponsors Section">
        <StyledImageContainer>
          <AnimatePresence>
            {sponsorData.map(
              ({ companyName, imageUrl }, index) =>
                index === currentImageIndex && (
                  <StyledSponsorImage
                    key={index + companyName}
                    imageUrl={imageUrl}
                    alt={companyName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                )
            )}
          </AnimatePresence>
        </StyledImageContainer>
      </SectionLayout>
    </Grid>
  );
};

export default ImageSlider;
