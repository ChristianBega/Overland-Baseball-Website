import { Box, Grid, Stack, Typography} from "@mui/material";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import baseballIcon from "../../assets/baseball-icon.png";
import homeIcon from "../../assets/iconsHome.png"
import batIcon from "../../assets/batIcon.png"
import "../alumni/alumni.css"
import { useTheme } from "@emotion/react";
// import placeHolderImg from "../assets/placeholder-image.png";
// import BrainGivensImg from "../assets/brainGivens.alumni.jpeg";

const BaseballIcon = () => <img width="100%" height="100%" src={baseballIcon} alt="baseball icon" />;
const HomeIcon = () => <img width="100%" height="100%" src={homeIcon} alt="home icon" />;
const BatIcon = () => <img width="100%" height="100%" src={batIcon} alt="bats icon" />;

const DateTypography = ({text}) => <Typography component="h2"  variant="h2" sx={{color:{xs:"white !important", lg:"black !important"}}}>{text}</Typography>;

const timelineData = [
  {
    playerName: "Brian Givens",
    position: "Pitcher",
    gradYear_Overland: "00-00-00",
    battingHand: "LH",
    throwingHand: "RH",
    birthDate: "Nov-06-1965",
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
    birthDate: "Oct-30-1970",
    higherLevel: "A+",
    statsYear: "1991",
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
    birthDate: "Jun-21-1972",
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
    birthDate: "Feb-27-1973",
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
    birthDate: "Sep-09-1975",
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
    birthDate: "Jun 02 1982",
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
    birthDate: "Mar 04 1986",
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
    birthDate: "May 24 1984",
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
    birthDate: "Jan 11 2001",
    higherLevel: "College",
    statsYear: "2021",
    college: "Lamar",
    mlb: "Milwaukee Brewers",
  },
];

export default function TimeLine() {
const theme = useTheme();
  return (
    <div className="time-line">
      <Typography typography="h1" sx={{ textAlign: "center", my: 10, color: theme.palette.secondary.main }}>
       ALUMNI TIMELINE
      </Typography>
      <VerticalTimeline layout="2-columns" lineColor="black">
        <VerticalTimelineElement
        iconClassName="icon"
        iconStyle={{ display: "flex", justifyContent: "center", alignContent: "center" }}
        icon={<BatIcon />}
      />
        {timelineData.map((timelineEl, index) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(19, 53, 118,.86)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(9, 46, 115)" }}
            iconClassName="icon"
            dateClassName="date"
            date={<DateTypography text={timelineEl.statsYear} />}
            iconStyle={{ display: "flex", justifyContent: "center", alignContent: "center" }}
            icon={<BaseballIcon />}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography component="h3" variant="h2" sx={{textAlign:"center"}}>
                  {timelineEl.playerName}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{display:"flex", justifyContent:"center",mb:4}}>
                <Stack direction="row" spacing={15} >
                <Typography component="h4">{timelineEl.birthDate}</Typography>
                <Typography component="h4">Graduated {timelineEl.gradYear_Overland}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Box component="img" sx={{ width: "285px", height: "285px" }} ></Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"center", mt:4, mb:4, borderStyle:"double"}}>
                <Stack direction={{xs:"column",sm:"row"}} spacing={{xs:3,sm:20}} >
                    <Typography component="h4">Pos: {timelineEl.position}</Typography>
                <Typography component="h4">League: {timelineEl.higherLevel}</Typography>
                <Typography component="h4">Stat Year: {timelineEl.statsYear}</Typography>
                <Typography component="h4">College: {timelineEl.college}</Typography>
                </Stack>
              </Grid>
          </VerticalTimelineElement>
        ))}
        <VerticalTimelineElement
        iconClassName="icon"
        iconStyle={{ display: "flex", justifyContent: "center", alignContent: "center" }}
        icon={<HomeIcon />}
      />
      </VerticalTimeline>
    </div>
  );
}
