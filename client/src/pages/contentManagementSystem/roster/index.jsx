import React from "react";
import { Container, Typography } from "@mui/material";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { useQuery } from "@tanstack/react-query";

import CmsListItem from "../cmsListItem";
import { fetchCMSItems } from "../../../setup/utils/firebase/getItem";
const CMSRoster = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  const { data, isLoading, error } = useQuery({ queryKey: ["roster-cms"], queryFn: () => fetchCMSItems("roster") });
  let values = [{}];

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
      {data?.map(({ handed, height, name, number, position, weight, year, yearAbbr, id }, index) => {
        values = [{ handed, height, name, number, position, weight, year, yearAbbr }];
        return <CmsListItem id={id} indexz={index} values={values} key={`${type}-${index}`} />;
      })}
    </Container>
  );
};

export default CMSRoster;
