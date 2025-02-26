import React from "react";
import Grid from "@mui/material/Grid/Grid";
import { Typography } from "@mui/material";

import BentoLayout from "../../../../components/reusableComponents/bentoLayout/bentoLayout.component";
import SectionLayout from "../../../../components/reusableComponents/sectionLayout/sectionLayout.component";

export default function Fundraisers({ fundraiserEvents }) {
  return (
    <Grid id="fundraiser-and-events" item xs={12}>
      <SectionLayout id="fundraiser-and-events-section" aria-label="Fundraiser and Events Section" marginBlock={true}>
        <Typography typography="h2" component="h2">
          Upcoming fundraisers
        </Typography>
        <BentoLayout gridItemsData={fundraiserEvents} />
      </SectionLayout>
    </Grid>
  );
}
