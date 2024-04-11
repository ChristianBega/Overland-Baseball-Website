import React from "react";
import { Container, Typography } from "@mui/material";

import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import CmsListItem from "../cmsListItem";
import { useFetchCMSItemsList } from "../cmsListItem/hooks/fetchCmsItem";

const CMSSchedule = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let values;

  const { data, isLoading, error } = useFetchCMSItemsList(type);

  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          Error fetching data
        </Typography>
      </div>
    );
  }

  return (
    <Container>
      {data?.map(({ away, home, date, location, opponent, time, id }, index) => {
        values = [{ away, home, date, location, opponent, time }];

        return <CmsListItem id={id} values={values} key={`${type}-${index}`} indexz={index} />;
      })}
    </Container>
  );
};

export default CMSSchedule;
