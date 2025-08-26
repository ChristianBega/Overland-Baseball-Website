import { styled } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
export const StyledPlayerCard = styled(Card)(({ theme, isTablet }) => ({
  maxWidth: "100%",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "325px",
  },
  margin: "0 auto",
  padding: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  minHeight: isTablet ? 300 : 260,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
export const StyledCardContent = styled(CardContent)({
  padding: 0,
  "&:last-child": {
    paddingBottom: 0,
  },
});
export const StyledImageContainer = styled(Box)({
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(36, 36, 36, 0.25) 100%)",
    borderRadius: "12px",
  },
});
export const StyledPlayerImage = styled(CardMedia)({
  width: "100%",
  height: "176px",
  objectFit: "cover",
  backgroundPosition: "center",
  borderRadius: "12px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
});
export const StyledPlaceholderImage = styled(StyledPlayerImage)({
  borderRadius: "20px",
});
export const StyledPositionBadge = styled(Typography)(({ theme }) => ({
  padding: ".5rem",
  borderRadius: "8px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textTransform: "uppercase",
  minWidth: "33px",
  minHeight: "33px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const StyledPlayerName = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "capitalize",
  textWrap: "wrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "140px",
});
export const StyledYearBadge = styled(Typography)(({ theme }) => ({
  padding: ".25rem",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.light,
  border: `1px solid ${theme.palette.borders.primary}`,
  color: theme.palette.primary.main,
}));
export const StyledStatItem = styled(Typography)({
  width: "50%",
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
  textTransform: "capitalize",
});
export const StyledStatIcon = styled("img")({
  width: "18px",
  height: "18px",
});
export const StyledStatIconLarge = styled("img")({
  width: "20px",
  height: "20px",
});
