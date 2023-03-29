// Team logos
import vistaPeak from "../assets/teamLogos/vistaPeak.webp";
import adamsCity from "../assets/teamLogos/adamsCity.webp";
import auroraCentral from "../assets/teamLogos/auroraCentral.webp";
import eagleCrest from "../assets/teamLogos/eagleCrest.webp";
import gateWay from "../assets/teamLogos/gateWay.webp";
import highlandsRanch from "../assets/teamLogos/vistaPeak.webp";
import mountainRange from "../assets/teamLogos/mountainRange.webp";
import mullen from "../assets/teamLogos/mullen.webp";
import standleyLake from "../assets/teamLogos/standleyLake.webp";
import thornton from "../assets/teamLogos/thornton.webp";
import westminster from "../assets/teamLogos/westminster.webp";
import vistaRidge from "../assets/teamLogos/vistaRidge.webp";

import cherryCreek from "../assets/teamLogos/cherryCreek.webp";
import grandView from "../assets/teamLogos/grandView.webp";
import smokyHill from "../assets/teamLogos/smokyHill.webp";
import cherokeeTrail from "../assets/teamLogos/cherokeeTrail.webp";
import arapahoe from "../assets/teamLogos/arapahoe.webp";
import rangeView from "../assets/teamLogos/rangeView.webp";

function createData(date, time, opponent, location, opponentLogo) {
  return { date, time, opponent, location, opponentLogo };
}

export const scheduleRowData = [
  createData("3/9/23", "4:00 PM", "Vista Peak", "Vista Peak Preparatory", vistaPeak),
  createData("3/11/23", "10:00 AM", "Vista Ridge", "Vista Ridge High", vistaRidge),
  createData("3/14/23", "4:00", "Mountain Range", "Overland High", mountainRange),
  createData("3/16/23", "4:00", "Vista Peak", "Overland High", vistaPeak),
  createData("3/28/23", "4:00", "Gateway", "Gateway High", gateWay),
  createData("3/30/23", "4:30", "Thornton", "Overland High", thornton),
  createData("4/1/23", "10:00 AM", "Highlands Ranch", "Overland High", highlandsRanch),
  createData("4/4/23", "4:00 PM", "Standley Lake", "Standley Lake High", standleyLake),

  createData("4/6/23", "4:00 PM", "Westminster", "Westminster High", westminster),
  createData("4/8/23", "10:00 AM", "Aurora Central", "Overland High", auroraCentral),
  createData("4/11/23", "4:15 PM", "Mullen", "Overland High", mullen),
  createData("4/13/23", "4:15 PM", "Eaglecrest", "Eaglecrest High", eagleCrest),
  createData("4/18/23", "4:15 PM", "Cherry Creek", "Cherry Creek High", cherryCreek),
  createData("4/22/23", "10:00 AM", "Grandview", "Overland High", grandView),
  createData("4/25/23", "4:15 PM", "Smoky Hill", "Smoky Hill High", smokyHill),
  createData("4/27/23", "4:15 PM", "Cherokee Trail", "Overland High", cherokeeTrail),
  createData("5/2/23", "4:15 PM", "Arapahoe", "Arapahoe High", arapahoe),
  // createData("5/6/23", "11:00 AM", "Aurora Central", "Overland High", vistaPeak),
  // createData("5/9/23", "4:15 PM", "Aurora Central", "Overland High", vistaPeak),
  createData("5/11/23", "4:00 PM", "Rangeview", "Overland High", rangeView),
  // createData("5/13/23", "4:00 PM", "Aurora Central", "Overland High", vistaPeak),
];

// Creating rows - rows represent horizontal data
// const rows = [];

// Date			Time			     Opponent		             	Location

// 4/11/23			4:15PM 		     Mullen 			Overland High
// 4/13/23			4:15PM 		     Eaglecrest			Eaglecrest High
// 4/18/23			4:15 PM		     Cherry Creek 		Cherry Creek High
// 4/22/23			11:00 AM		     Grandview 			Overland High
// 4/25/23			4:15 PM		     Smoky Hill 			Smoky Hill High
// 4/27/23			4:15 PM 		     Cherokee Trail 		Overland High
// 5/2/23			4:15 PM 		     Arapahoe 			Arapahoe High
// 5/6/23			11:00 AM		     Centennial League Challenge 	TBD
// 5/9/23			4:15 PM 		     Centennial League Challenge	TBD
// 5/11/23			4:00 PM		     Rangeview			Overland High
// 5/13/23			4:00 PM		     Centennial League Challenge	TBD
