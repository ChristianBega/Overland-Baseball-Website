// Team logos
import vistaPeak from "../assets/homePage/teamLogos/vistaPeak.webp";
import auroraCentral from "../assets/homePage/teamLogos/auroraCentral.webp";
import eagleCrest from "../assets/homePage/teamLogos/eagleCrest.webp";
import gateWay from "../assets/homePage/teamLogos/gateWay.webp";
import highlandsRanch from "../assets/homePage/teamLogos/vistaPeak.webp";
import mountainRange from "../assets/homePage/teamLogos/mountainRange.webp";
import mullen from "../assets/homePage/teamLogos/mullen.webp";
import standleyLake from "../assets/homePage/teamLogos/standleyLake.webp";
import thornton from "../assets/homePage/teamLogos/thornton.webp";
import westminster from "../assets/homePage/teamLogos/westminster.webp";
import vistaRidge from "../assets/homePage/teamLogos/vistaRidge.webp";
import cherryCreek from "../assets/homePage/teamLogos/cherryCreek.webp";
import grandView from "../assets/homePage/teamLogos/grandView.webp";
import smokyHill from "../assets/homePage/teamLogos/smokyHill.webp";
import cherokeeTrail from "../assets/homePage/teamLogos/cherokeeTrail.webp";
import arapahoe from "../assets/homePage/teamLogos/arapahoe.webp";
import rangeView from "../assets/homePage/teamLogos/rangeView.webp";

// Slider Images
import aleman2 from "../assets/imagesSlider/Aleman2.webp";
import aleman2Sm from "../assets/imagesSlider/mobileImages/Aleman2-sm.webp";

import aleman2Md from "../assets/imagesSlider/tabletImages/Aleman2-md.webp";

import bega from "../assets/imagesSlider/Bega1.webp";
import begaSm from "../assets/imagesSlider/mobileImages/Bega1-sm.webp";
import begaMd from "../assets/imagesSlider/tabletImages/Bega1-md.webp";

import bega3 from "../assets/imagesSlider/Bega3.webp";
import bega3Sm from "../assets/imagesSlider/mobileImages/Bega3-sm.webp";
import bega3Md from "../assets/imagesSlider/tabletImages/Bega3-md.webp";

import cox from "../assets/imagesSlider/Cox2.webp";
import coxSm from "../assets/imagesSlider/mobileImages/Cox2-sm.webp";
import coxMd from "../assets/imagesSlider/tabletImages/Cox2-md.webp";

import dom from "../assets/imagesSlider/Dom2.webp";
import domSm from "../assets/imagesSlider/mobileImages/Dom2-sm.webp";
import domMd from "../assets/imagesSlider/tabletImages/Dom2-md.webp";

import medley1 from "../assets/imagesSlider/Medleyhitting.webp";
import medley1Sm from "../assets/imagesSlider/mobileImages/Medleyhitting-sm.webp";
import medley1Md from "../assets/imagesSlider/tabletImages/Medleyhitting-md.webp";

import medley3 from "../assets/imagesSlider/Medley3.webp";
import medley3Sm from "../assets/imagesSlider/mobileImages/Medley3-sm.webp";
import medley3Md from "../assets/imagesSlider/tabletImages/Medley3-md.webp";

function createData(date, time, opponent, location, opponentLogo) {
  return { date, time, opponent, location, opponentLogo };
}

export const scheduleRowData = [
  createData("3/9/23", "4:00 PM", "Vista Peak", "Vista Peak Preparatory", vistaPeak),
  createData("3/11/23", "10:00 AM", "Vista Ridge", "Vista Ridge High", vistaRidge),
  createData("3/14/23", "4:00 PM", "Mountain Range", "Overland High", mountainRange),
  createData("3/16/23", "4:00 PM", "Vista Peak", "Overland High", vistaPeak),
  createData("3/28/23", "4:00 PM", "Gateway", "Gateway High", gateWay),
  createData("3/30/23", "4:30 PM", "Thornton", "Overland High", thornton),
  createData("4/1/23", "10:00 AM", "Highlands Ranch", "Overland High", highlandsRanch),
  createData("4/4/23", "4:00 PM", "Standley Lake", "Standley Lake High", standleyLake),
  createData("4/6/23", "4:00 PM", "Westminster", "Westminster High", westminster),
  createData("4/8/23", "10:00 AM", "Aurora Central", "Overland High", auroraCentral),
  createData("4/11/23", "4:15 PM", "Mullen", "Overland High", mullen),
  createData("4/13/23", "4:15 PM", "Eagle Crest", "Eaglecrest High", eagleCrest),
  createData("4/18/23", "4:15 PM", "Cherry Creek", "Cherry Creek High", cherryCreek),
  createData("4/22/23", "10:00 AM", "Grand View", "Overland High", grandView),
  createData("4/25/23", "4:15 PM", "Smoky Hill", "Smoky Hill High", smokyHill),
  createData("4/27/23", "4:15 PM", "Cherokee Trail", "Overland High", cherokeeTrail),
  createData("5/2/23", "4:15 PM", "Arapahoe", "Arapahoe High", arapahoe),
  // createData("5/6/23", "11:00 AM", "Aurora Central", "Overland High", vistaPeak),
  // createData("5/9/23", "4:15 PM", "Aurora Central", "Overland High", vistaPeak),
  createData("5/11/23", "4:00 PM", "Range View", "Overland High", rangeView),
  // createData("5/13/23", "4:00 PM", "Aurora Central", "Overland High", vistaPeak),
];
export const newsData = [
  {
    newsOne: "Welcome to the official site of Overland Baseball in Aurora, Colorado! Stay tuned for exciting news about our",
    newsLink: [
      { name: "upcoming games", pathname: "/#schedule", linkType: "href" },
      { name: "fundraisers", pathname: "/events#fundraiser-and-events" },
      { name: "useful links", pathname: "/#quick-links", linkType: "href" },
      { name: "all other events", pathname: "/events" },
    ],
    newsTwo:
      "At Overland, we are developing players who often are overlooked and need to be looked over again. We put focus on fundamentals, minor changes and creating player improvement. Trailblazers Baseball training is expanding rapidly and our program is perfect for ages 13-18 yrs old.",
  },
];

export const imageSliderData = [
  {
    imageUrl: { small: aleman2Sm, medium: aleman2Md, original: aleman2 },
    description: "Right handed batter Aleman taking a huge swing at home plate.",
  },
  { imageUrl: { small: begaSm, medium: begaMd, original: bega }, description: "Bega pitching..." },
  { imageUrl: { small: bega3Sm, medium: bega3Md, original: bega3 }, description: "Bega first base..." },
  { imageUrl: { small: coxSm, medium: coxMd, original: cox }, description: "Cox fielding..." },
  { imageUrl: { small: domSm, medium: domMd, original: dom }, description: "Dom throwing..." },
  { imageUrl: { small: medley1Sm, medium: medley1Md, original: medley1 }, description: "Medley hitting..." },
  { imageUrl: { small: medley3Sm, medium: medley3Md, original: medley3 }, description: "Medley running bases..." },
];
