import React from "react";
import { Container } from "@mui/material";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { useQuery } from "@tanstack/react-query";

import CmsListItem from "../cmsListItem";
import { fetchCMSItems } from "../../../setup/utils/firebase/getItem";
import LoadingErrorIndicator from "../../loadingErrorIndicator";
const CMSRoster = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  const { data, isLoading, error } = useQuery({ queryKey: ["roster-cms"], queryFn: () => fetchCMSItems("roster") });
  let values = [{}];

  return (
    <Container>
      <LoadingErrorIndicator isLoading={isLoading} error={error} />
      {data?.map(({ handed, height, name, number, position, weight, year, yearAbbr, id }, index) => {
        values = [{ handed, height, name, number, position, weight, year, yearAbbr }];
        return <CmsListItem id={id} indexz={index} values={values} key={`${type}-${index}`} />;
      })}
    </Container>
  );
};

export default CMSRoster;
