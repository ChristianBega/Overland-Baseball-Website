import { styled } from "@mui/material/styles";
import SectionLayout from "./SectionLayout";

export const StyledSectionLayoutWrapper = styled(SectionLayout)(({ theme }) => ({
  backgroundColor: "#f8f9fa",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  borderRadius: "20px",
  border: "1px solid #ededf1",
}));
