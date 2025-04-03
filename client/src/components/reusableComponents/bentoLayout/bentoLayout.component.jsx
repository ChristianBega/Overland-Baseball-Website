import React, { useState } from "react";
import { Grid } from "@mui/material";
import EventCard from "../../../pages/home/components/events/components/eventCard/eventCard.component";
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";
import EventSignUpForm from "../../../pages/events/components/eventSignUpForm/eventSignUpForm";
import { useModal } from "../../../setup/context/modal.context";
const BentoLayout = ({ gridItemsData }) => {
  const { isMd } = useMediaQueries();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const { openModal, closeModal } = useModal();
  const handleSelectedCardClick = (index) => {
    console.log("selectedCardIndex", index);
    openModal(<EventSignUpForm data={gridItemsData[index]} closeModal={closeModal} />);
  };

  return (
    <Grid container rowSpacing={4} columnSpacing={4} sx={{ height: "100%" }}>
      {isMd ? (
        <>
          {/* Selected Card */}
          <EventCard
            key={selectedCardIndex}
            card={gridItemsData[selectedCardIndex]}
            index={selectedCardIndex}
            selectedCardIndex={selectedCardIndex}
            setSelectedCardIndex={setSelectedCardIndex}
            handleSelectedCardClick={handleSelectedCardClick}
          />
          {/* Other Cards */}
          <Grid item md={6}>
            <Grid container rowSpacing={2}>
              {gridItemsData.map((card, index) => {
                // if index is not the selectedCardIndex, render the card
                if (index !== selectedCardIndex) {
                  return (
                    <Grid item xs={12} key={index}>
                      <EventCard card={card} index={index} selectedCardIndex={selectedCardIndex} setSelectedCardIndex={setSelectedCardIndex} />
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {gridItemsData.map((card, index) => (
            <EventCard
              key={index}
              card={card}
              index={index}
              selectedCardIndex={selectedCardIndex}
              setSelectedCardIndex={setSelectedCardIndex}
              handleSelectedCardClick={handleSelectedCardClick}
            />
          ))}
        </>
      )}
    </Grid>
  );
};

export default BentoLayout;

// ideas - phase 2
// 2. childComponent - the component we want to render as the gridItem
// 2. have additional props for bentoLayoutType, which will provide different bento layouts....
