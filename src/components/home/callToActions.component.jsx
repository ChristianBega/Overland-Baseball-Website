import { Grid, Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  // flex: 1,
  // margin: theme.spacing(8),
  textAlign: "center",
  // minHeight: "50%",
  // padding: theme.spacing(15), // 14px
  color: theme.palette.text.primary,
  background: theme.palette.accent.accentOne,
}));
export default function TeamStore() {
  return (
    <Grid item xs={12} lg={4}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        <Grid item xs={6} md={3} lg={6}>
          <StyledPaper sx={{ bgcolor: "blue" }}>TeamStore</StyledPaper>
        </Grid>
        <Grid item xs={6} md={3} lg={6}>
          <StyledPaper sx={{ bgcolor: "red" }}>Documents</StyledPaper>
        </Grid>
        <Grid item xs={6} md={3} lg={6}>
          <StyledPaper sx={{ bgcolor: "orange" }}>CashApp QR code</StyledPaper>
        </Grid>
        <Grid item xs={6} md={3} lg={6}>
          <StyledPaper sx={{ bgcolor: "green" }}>Events</StyledPaper>
        </Grid>
      </Grid>
    </Grid>
  );
}
