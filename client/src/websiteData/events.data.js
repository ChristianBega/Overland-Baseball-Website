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
  createData("Uniform Issue", "Overland Hs Locker Room", "4-6:00pm", "3/01/24"),
  createData("Spring Break Begins", "Overland Hs", "", "3/18/24"),
  createData("Spring Season", "Overland Hs", "", "3/04/24"),
  createData("Winter Break", "Overland Hs", "", "12/22/23"),
  createData("Tournaments", "Overland Hs Schenbeck Field", "9am-6pm", "9/23/23"),
  createData("Tournaments", "Overland Hs Schenbeck Field", "9am-6pm", "9/24/23"),
  createData("Tournaments", "Overland Hs Schenbeck Field", "9am-6pm", "9/30/23"),
  createData("Tournaments", "Overland Hs Schenbeck Field", "9am-6pm", "10/01/23"),
  createData("Field Clean Up", "Overland Hs Schenbeck Field", "4-6:00pm", "11/01/23"),
  createData("Spring Tryouts", "Overland baseball Field", "4-6:00pm", "2/26/24"),
  createData("Individual/Team Picture Day", "OHS Gym/ Schenbeck Field", "4-6:00pm", "3/02/24"),
  createData("Spirit Day", "Overland Hs Gym/ Schenbeck Field", "4-6:00pm", "3/02/24"),
  createData("Fall Workouts", "Overland Hs Weightroom/ Schenbeck Field", "4-6pm", "10/2/23"),
  createData("Winter Hitting", "Legends Hitting Facility", "4-6:00pm", "1/04/24"),
  createData("Spring Registration", "https://overland-ar.rschooltoday.com/node/17", "", "1/16/24"),
  createData("Winter conditioning", "Overland Hs Weightroom", "4-6:00pm", "1/02/24"),
  createData("Spring Season Start", "Overland Hs Schenbeck Field", "4-6:00pm", "3/04/24"),
  createData("Spring Break", "Overland Hs", "", "3/18/24"),
  createData("Apple Bees", "Location: TBD", "Time: TBD", "Date: TBD"),
  createData("Broncos Game", "Location: TBD", "Time: TBD", "Date: TBD"),
];

export const youthProgramData = {
  date: "May 20, 2024",
  location: "Overland Field",
  time: "8:00am–2:00pm ",
  content: [
    "Our Youth Program is designed to instill a love for baseball in kids of all skill levels, fostering teamwork, sportsmanship, and skill development. From fundamental coaching to friendly matches, we provide a safe and supportive environment for young players to learn and grow in the sport they're passionate about.",
    "Campers will get the opportunity to learn baseball skills from current players and coaches of Overland Trailblazers. The day will consist of hitting, fielding, throwing, and catching, teaching each camper the fundamentals of the game.",
  ],
  contentList: ["Eligible players: 7th & 8th grade", "Cost: $50 per player", "Players will receive a Blazers shirt and hat"],
};
const tryoutContent = [
  "Are you ready to challenge yourself at Overland Baseball and take your game to the next level? Our annual tryouts are your chance to showcase your talent, determination, and passion for baseball. We're on the lookout for dedicated players who are eager to contribute to the team. Stay tuned for tryout dates, and come prepared to demonstrate your skills and commitment on the field.",
];
const tryoutContentList = ["Must be registered for TrailBlazer baseball, paid the Athletic Fees, and have a current physical."];
export const springTryoutData = {
  eventName: "Spring tryouts",
  date: "Feb 26, 2024",
  location: "Overland Field",
  time: "4:00-6:00 PM",
  content: [...tryoutContent],
  contentList: tryoutContentList,
  currentSeason: "spring",
};
export const summerTryoutData = {
  eventName: "Summer tryouts",
  date: "May 20, 2024",
  location: "Overland Field",
  time: "10:00-12:00 AM",
  content: [...tryoutContent],
  contentList: tryoutContentList,
  currentSeason: "summer",
};
export const fallTryoutData = {
  eventName: "Fall tryouts",
  date: "Aug 15, 2024",
  location: "Overland Field",
  time: "4:00–6:00 PM",
  content: [...tryoutContent],
  contentList: tryoutContentList,
  currentSeason: "fall",
};

const workoutContent = [
  "Success on the diamond requires more than just natural talent – it requires hard work and dedication. Our comprehensive workouts at Overland Baseball are tailored to enhance players' strength, agility, and overall performance. Through drills, conditioning exercises, and excellent coaching, we ensure that every athlete is equipped with the tools they need to excel both on and off the field. Join us in the pursuit of excellence, one rep at a time.",
];
export const springWorkoutsData = {
  eventName: "Spring workouts",
  date: "Jan 2, 2024",
  location: "Overland Gym",
  time: "4:00-6:00pm",
  content: [...workoutContent],
  currentSeason: "spring",
};
export const winterWorkoutsData = {
  eventName: "Winter hitting",
  date: "Jan 4, 2024",
  location: "Legends Hitting Facility",
  time: "4:00-6:00pm",
  content: [...workoutContent],
  currentSeason: "winter",
};
export const fallWorkoutsData = {
  eventName: "Fall workouts",
  date: "Oct 2, 2023",
  location: "OHS Weightroom/Field",
  time: "4:00-6:00pm",
  content: [...workoutContent],
  currentSeason: "fall",
};
