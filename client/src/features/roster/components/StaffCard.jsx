// MUI Components
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
// Components
import TextBlock from "../../ui/components/TextBlock";
import SocialIcons from "../../ui/components/SocialIcons";
// Assets
import PlaceHolderImage from "../../../assets/coachRosterPlaceHolder.jpg";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const StaffCard = ({ title, name, image = PlaceHolderImage, socialIcons, ...rest }) => {
  const { isTablet } = useMediaQueries();

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        minHeight: isTablet ? 300 : 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      {...rest}
    >
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(36, 36, 36, 0.25) 100%)",
              borderRadius: "20px",
            },
          }}
        >
          <CardMedia
            component="img"
            src={image}
            alt={`${title} ${name}`}
            sx={{
              width: "100%",
              maxHeight: "325px",
              objectFit: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          />
          {socialIcons && (
            <SocialIcons
              variant="circle"
              icons={socialIcons}
              spacing={1}
              size="small"
              color="primary.main"
              sx={{ mt: 1, mb: 0, justifyContent: "center", position: "absolute", bottom: "10px", left: 0, right: 0, zIndex: 10 }}
            />
          )}
        </Box>

        <TextBlock spacing={2} alignItems="center" mt={2}>
          <Typography component="h3" variant="h3" color="primary.main" fontWeight={600}>
            {name}
          </Typography>
          <Typography component="h4" variant="body2" fontWeight={500} sx={{ letterSpacing: "0.05em", mt: "0 !important" }}>
            {title}
          </Typography>
        </TextBlock>
      </CardContent>
    </Card>
  );
};

StaffCard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  socialIcons: PropTypes.array,
};

export default StaffCard;
