// Fundraiser Card Images
import TournamentsImage from "../assets/coloradoClassics.png";
import BroncosImage from "../assets/broncosVolunteer.png";
import FieldCleanUpImage from "../assets/fieldCleanUp.jpg";
import AppleBeesImage from "../assets/appleBees.png";

function createData(eventName, location, time, date) {
  return { eventName, location, time, date };
}

// Fundraiser card data
export const fundraisersCardData = [
  {
    eventName: "Broncos",
    content: "Broncos Games ",
    image: BroncosImage,
    date: "1-12-23",
    time: "11 am",
  },
  {
    eventName: "tournaments",
    content: "Overland tournaments",
    image: TournamentsImage,
    date: "2-12-23",
    time: "11 am",
  },
  {
    eventName: "Felid Clean Up",
    content: "Fall Clean Up",
    image: FieldCleanUpImage,

    date: "9-12-23",
    time: "1 pm",
  },
  {
    eventName: "Apple Bees",
    content: "box 4",
    image: AppleBeesImage,
    date: "8-22-23",
    time: "8 pm",
  },
];
// All event data
export const eventData = [
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "2:00 PM",
  //   date: "July 23rd",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "1:30 PM",
  //   date: "July 30th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "2:30 PM",
  //   date: "Aug 13th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "2:30 PM",
  //   date: "Aug 18th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "2:30 PM",
  //   date: "Aug 27th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "10:00 AM",
  //   date: "Sept 18th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "1:50 PM",
  //   date: "Sept 25th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "1:45 PM",
  //   date: "Oct 6th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "9:30 AM",
  //   date: "Oct 23rd",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "9:30 AM",
  //   date: "Nov 20th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "10:00 AM",
  //   date: "Dec 3rd",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "1:50 PM",
  //   date: "Dec 11th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "9:30 AM",
  //   date: "Dec 18th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },
  // {
  //   eventName: "Broncos Game",
  //   location: "1801 Mile High Stadium Cir Denver CO 80204",
  //   time: "TBD",
  //   date: "Jan 7th",
  //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   extraInformation: "Dolor in reprehenderit in voluptate...",
  // },

  // Broncos Games
  createData("Broncos Game", "1801 Mile High Stadium Cir Denver CO 80204", "2:00 PM", "July 23rd"),

  // Field Clean Up
  createData("Field Clean Up", "Overland Baseball field", "10:00 PM", "TBD"),
  createData("Field Clean Up", "Overland Baseball field", "10:00 PM", "TBD"),
  createData("Field Clean Up", "Overland Baseball field", "10:00 PM", "TBD"),

  // Tournament data
  createData("Tournament", "1300 W Swallow Rd. Fort Collins CO", "TBD", "July 27th"),
  createData("Tournament", "10300 W South Boulder Rd. Lafayette CO", "TBD", "July 28th"),
  createData("Tournament", "TBD", "TBD", "TBD"),

  // Apple Bees
  createData("Apple Bees", "TBD", "TBD", "TBD"),
  createData("Apple Bees", "TBD", "TBD", "TBD"),
  createData("Apple Bees", "TBD", "TBD", "TBD"),
  createData("Apple Bees", "TBD", "TBD", "TBD"),
];
