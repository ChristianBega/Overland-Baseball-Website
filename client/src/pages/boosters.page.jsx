import React from "react";
import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import ImageOne from "../assets/unformated/kenny-nguy-n-fSrlWGw7d9g-unsplash.jpg";
import ImageTwo from "../assets/unformated/frankie-lopez-CtgjUuLQ0JA-unsplash.jpg";
import ImageThree from "../assets/unformated/tim-mossholder-vdhNO4mGQ14-unsplash.jpg";

// Components
// import Donations from "../components/boosters/donations.component";
// import Wishlist from "../components/boosters/wishlist.component";
// import CashAppQRcode from "../components/boosters/cashAppQRcode.component";
import BoosterImageSlider from "../components/boosters/boosterImageSlider.component";
import TextComponent from "../components/reusableComponents/textComponent.component";

const boostersDataMissionStatement = {
  id: "missionStatement",
  title: "Our Mission",
  content:
    "The Overland Baseball Boosters Club is dedicated to fostering a culture of excellence and personal growth. Our mission centers around building character by nurturing values such as sportsmanship, teamwork, discipline, and integrity in our student-athletes, equipping them to thrive both on and off the baseball field. Beyond the game of baseball, we are committed to preparing our student-athletes for success in life. We emphasize the importance of academic achievement and personal growth, encouraging them to excel not only as athletes but as responsible, well-rounded individuals who make positive contributions to society.",
  image: ImageTwo,
};

const boostersDataAnnouncements = {
  id: "announcements",
  title: "Announcements",
  content:
    "Get ready to have some fun and support the Overland Trailblazers at our upcoming booster events! Your participation means a lot to us, and it's a fantastic way to keep our baseball program thriving. Join the excitement at our upcoming Applebee's Breakfast, Bronco Games, and King Soopers Card fundraisers. Mark your calendar and come be a part of the action!",
  image: ImageOne,
};

const boostersDataVolunteer = {
  id: "Volunteer",
  title: "Volunteers needed ",
  content:
    "The Overland Baseball Boosters Club is on a mission to support our student-athletes and enhance their baseball experience. But we can't do it without your help! We're currently seeking enthusiastic parents to volunteer for crucial roles that keep our program running smoothly. Whether you have a knack for fundraising, can manage the snack shack like a pro, are handy with field maintenance, or have coaching experience, we want you on our team. Your dedication can make a significant impact on our athletes' journey to success.",
  image: ImageThree,
};

export default function BoostersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container component="section" id="boosters-section" style={{ display: "flex", justifyContent: " center", flexDirection: "column" }}>
      <Typography typography="h1" component="h1" sx={{ mb: { lg: theme.spacing(24) } }}>
        Boosters Club
      </Typography>
      <Grid container maxWidth="lg" rowSpacing={isMobile ? 12 : 32}>
        {isMobile && (
          <>
            <BoosterImageSlider boosterData={boostersDataMissionStatement} isMobile={isMobile} />
            <TextComponent isMobile={isMobile} boosterData={boostersDataMissionStatement} />
          </>
        )}
        {!isMobile && (
          <>
            <TextComponent isMobile={isMobile} boosterData={boostersDataMissionStatement} />
            <BoosterImageSlider boosterData={boostersDataMissionStatement} isMobile={isMobile} />
          </>
        )}
        {isMobile && (
          <>
            <BoosterImageSlider boosterData={boostersDataAnnouncements} isMobile={isMobile} />
            <TextComponent isMobile={isMobile} boosterData={boostersDataAnnouncements} />
          </>
        )}
        {!isMobile && (
          <>
            <BoosterImageSlider boosterData={boostersDataAnnouncements} isMobile={isMobile} />
            <TextComponent isMobile={isMobile} boosterData={boostersDataAnnouncements} />
          </>
        )}
        {isMobile && (
          <>
            <BoosterImageSlider boosterData={boostersDataVolunteer} isMobile={isMobile} />
            <TextComponent sectionType={"volunteer"} isMobile={isMobile} boosterData={boostersDataVolunteer} />
          </>
        )}
        {!isMobile && (
          <>
            <TextComponent sectionType={"volunteer"} isMobile={isMobile} boosterData={boostersDataVolunteer} />
            <BoosterImageSlider boosterData={boostersDataVolunteer} isMobile={isMobile} />
          </>
        )}
        {/* 
        <Donations />
        <CashAppQRcode />
        <Wishlist /> */}
      </Grid>
    </Container>
  );
}
