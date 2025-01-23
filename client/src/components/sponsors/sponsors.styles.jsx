import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";

export const StyledImageContainer = styled(Box)({
  position: "relative",
  height: "200px",
  overflow: "hidden",
  marginBottom: "2.65625rem",
});
export const StyledSponsorImage = styled(motion.img)(({ imageUrl }) => ({
  // backgroundImage: `url(${imageUrl?.small})`,
  // backgroundSize: "contain",
  // backgroundPosition: "center",
  // backgroundRepeat: "no-repeat",
  // position: "absolute",
  // width: "100%",
  margin: "0 auto",
  width: "200px",
  height: "200px",
}));
