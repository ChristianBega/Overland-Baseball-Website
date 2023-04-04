import { Box, Grid, Stack, Typography} from "@mui/material";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTheme } from "@emotion/react";
import baseballIcon from "../../assets/baseball-icon.png";
import "../alumni/alumni.css"
// import placeHolderImg from "../assets/placeholder-image.png";
// import BrainGivensImg from "../assets/brainGivens.alumni.jpeg";

const BaseballIcon = () => <img width="100%" height="100%" src={baseballIcon} title="baseball icon" />;

const timelineData = [
  {
    playerName: "Brian Givens",
    position: "Pitcher",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1965-11-06",
    higherLevel: "MLB",
    statsYear: "1984",
    college: "Trinidad State",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Mike Biltimier",
    position: "1st Base",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1970-10-30",
    higherLevel: "A+",
    statsYear: "1984",
    college: "Purdue",
    mlb: "Milwaukee Brewers",
  },
   {
    playerName: "Chet Justice",
    position: "Pitcher",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1971",
    higherLevel: "College",
    statsYear: "1992",
    college: "Florida, Santa Fe CC",
    mlb: "Milwaukee Brewers",
  },
   {
    playerName: "Tommy Schenbeck",
    position: "Pitcher",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1972-06-21",
    higherLevel: "A+",
    statsYear: "1992",
    college: "Palm Beach State",
    mlb: "Milwaukee Brewers",
  },
   {
    playerName: "Wilbert Baker",
    position: "3rd-1st Base",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1973-02-27",
    higherLevel: "Indy",
    statsYear: "1995",
    college: "Mesa State College",
    mlb: "Milwaukee Brewers",
  },
   {
    playerName: "Chris Gentner",
    position: "Pitcher",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1975-09-09",
    higherLevel: "Indy",
    statsYear: "1997",
    college: "Northern Colorado",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Sean Clancy",
    position: "Pitcher",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1982-06-02",
    higherLevel: "College",
    statsYear: "2003",
    college: "Kansas State, Lamar CC",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Kris Jiggitts",
    position: "Pitcher",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1986-03-04",
    higherLevel: "Indy",
    statsYear: "2009",
    college: "Colby College",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Juan Martinez",
    position: "Outside Field",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "1984-05-24",
    higherLevel: "Indy",
    statsYear: "2009",
    college: "CSU-Pueblo",
    mlb: "Milwaukee Brewers",
  },
  {
    playerName: "Jose Clintron",
    position: "Inside Field",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "2001-01-11",
    higherLevel: "College",
    statsYear: "2021",
    college: "Lamar",
    mlb: "Milwaukee Brewers",
  },
];

export default function TimeLine() {


  return (
    <div className="time-line">
      <VerticalTimeline layout="2-columns" lineColor="black">
        {timelineData.map((timelineEl, index) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="2011-present"
            iconClassName="icon"
            iconStyle={{ display: "flex", justifyContent: "center", alignContent: "center" }}
            icon={<BaseballIcon />}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography component="h3" variant="h2" sx={{textAlign:"center"}}>
                  {timelineEl.playerName}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                <Stack direction="row" spacing={15} >
                <Typography component="h4">DOB: {timelineEl.birthDate}</Typography>
                <Typography component="h4">Pos: {timelineEl.position}</Typography>
                <Typography component="h4">Graduated {timelineEl.gradYear_Overland}</Typography>
                </Stack>
              </Grid>
              {/* <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Typography component="h4">Graduated {timelineEl.gradYear_Overland}</Typography>
              </Grid> */}

              <Grid item xs={12} display="flex" justifyContent="center">
                <Box component="img" sx={{ width: "285px", height: "285px" }} ></Box>
              </Grid>
            </Grid>
            {/* <h3 className="vertical-timeline-element-title"></h3> */}
            {/* <h4 className="vertical-timeline-element-subtitle">{timelineEl.position}</h4> */}
            <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                <Stack direction="row" spacing={15} >
                <Typography component="h4">League: {timelineEl.higherLevel}</Typography>
                <Typography component="h4">Stat Year: {timelineEl.statsYear}</Typography>
                <Typography component="h4">College: {timelineEl.college}</Typography>
                </Stack>
              </Grid>
          </VerticalTimelineElement>
        ))}

        {/* <VerticalTimelineElement iconStyle={{}} icon={<BaseballIcon />} /> */}
      </VerticalTimeline>
    </div>
  );
}
