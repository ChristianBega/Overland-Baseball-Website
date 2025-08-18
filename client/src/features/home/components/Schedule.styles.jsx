import { styled } from "@mui/material/styles";
import SectionLayout from "../../ui/components/SectionLayout";

export const StyledScheduleSectionLayout = styled(SectionLayout)(({ theme }) => ({
  backgroundColor: "#f8f9fa",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  borderRadius: "20px",
  border: "1px solid #ededf1",
}));
