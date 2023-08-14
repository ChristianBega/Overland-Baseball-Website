// Fundraiser Card Images
import TournamentsImage from "../assets/eventsPage/coloradoClassics.webp";
import BroncosImage from "../assets/eventsPage/broncosVolunteer.webp";
import FieldCleanUpImage from "../assets/eventsPage/fieldCleanUp.webp";
import AppleBeesImage from "../assets/eventsPage/appleBees.webp";

function createData(eventName, location, time, date) {
  return { eventName, location, time, date };
}

// Fundraiser card data
export const fundraisersCardData = [
  {
    eventName: "Broncos",
    content: "Broncos Games ",
    image: BroncosImage,
  },
  {
    eventName: "Tournaments",
    content: "Overland tournaments",
    image: TournamentsImage,
  },
  {
    eventName: "Field Clean Up",
    content: "Fall Clean Up",
    image: FieldCleanUpImage,
  },
  {
    eventName: "Apple Bees",
    content: "box 4",
    image: AppleBeesImage,
  },
];
// All event data
export const eventData = [
  // Broncos Games
  createData("Broncos Game", "1801 Mile High Stadium Cir Denver CO 80204", "2:00 PM", "July 23rd"),

  // Field Clean Up
  createData("Field Clean Up", "Overland Baseball field", "10:00 PM", "TBD"),
  createData("Field Clean Up", "Overland Baseball field", "10:00 PM", "TBD"),
  createData("Field Clean Up", "Overland Baseball field", "10:00 PM", "TBD"),

  // Tournament data
  createData("Tournaments", "1300 W Swallow Rd. Fort Collins CO", "TBD", "July 27th"),
  createData("Tournaments", "10300 W South Boulder Rd. Lafayette CO", "TBD", "July 28th"),
  createData("Tournaments", "TBD", "TBD", "TBD"),

  // Apple Bees
  createData("Apple Bees", "TBD", "TBD", "TBD"),
  createData("Apple Bees", "TBD", "TBD", "TBD"),
  createData("Apple Bees", "TBD", "TBD", "TBD"),
  createData("Apple Bees", "TBD", "TBD", "TBD"),
];

export const youthProgramData = {
  date: "May 20, 2023",
  location: "Overland Field",
  time: "8am–2pm ",
  content: [
    "Nurturing the future stars of the game is a priority at Overland Baseball. Our Youth Program is designed to instill a love for baseball in kids of all skill levels, fostering teamwork, sportsmanship, and skill development. From fundamental coaching to friendly matches, we provide a safe and supportive environment for young players to learn and grow in the sport they're passionate about.",
    "Campers will get the opportunity to learn baseball skills from current players and coaches of Overland Trailblazers. The day will consist of hitting, fielding, throwing, and catching, teaching each camper the fundamentals of the game.",
    "Eligible players: 7th & 8th grade",
    "Cost: $50 per player",
    "**Players will receive a Blazers shirt and hat **",
  ],
};

const summerContent = [
  "Are you ready to challenge yourself at Overland Baseball and take your game to the next level? Our annual tryouts are your chance to showcase your talent, determination, and passion for baseball. We're on the lookout for dedicated players who are eager to contribute to the team. Stay tuned for tryout dates, and come prepared to demonstrate your skills and commitment on the field.",
  "Must be registered for TrailBlazer baseball, paid the Athletic Fees, and have a current physical.",
];

export const springTryoutData = {
  date: "Feb 27, 2023",
  location: "Overland Field",
  time: "4:00-6:00 PM",
  content: [...summerContent],
};
export const summerTryoutData = {
  date: "June ??, 2023",
  location: "Overland Field",
  time: "10:00-12:00 AM",
  content: [...summerContent],
};
export const fallTryoutData = {
  date: "Oct ??, 2023",
  location: "Overland Field",
  time: "4:00–6:00 PM",
  content: [...summerContent],
};

const workoutContent = [
  "Success on the diamond requires more than just natural talent – it requires hard work and dedication. Our comprehensive workouts at Overland Baseball are tailored to enhance players' strength, agility, and overall performance. Through drills, conditioning exercises, and excellent coaching, we ensure that every athlete is equipped with the tools they need to excel both on and off the field. Join us in the pursuit of excellence, one rep at a time.",
];

export const springWorkoutsData = {
  date: "??? ??, 2024",
  location: "Overland Field",
  time: "?:00-?:00 PM",
  content: [...workoutContent],
};
export const summerWorkoutsData = {
  date: "??? ??, 2024",
  location: "Overland Field",
  time: "?:00-?:00 PM",
  content: [...workoutContent],
};
export const fallWorkoutsData = {
  date: "??? ??, 2023",
  location: "Overland Field",
  time: "?:00–?:00 PM",
  content: [...workoutContent],
};
