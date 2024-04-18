import React from "react";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import CmsListItem from "../cmsListItem";
import LoadingErrorIndicator from "../../loadingErrorIndicator";
import { fetchCMSItems } from "../../../setup/utils/firebase/getItem";

const CMSSchedule = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let values;

  const { data, isLoading, error } = useQuery({ queryKey: ["schedule-cms"], queryFn: () => fetchCMSItems("schedule") });

  return (
    <Container>
      <LoadingErrorIndicator isLoading={isLoading} error={error} />
      {data?.map(({ away, home, date, location, opponent, time, id }, index) => {
        values = [{ away, home, date, location, opponent, time }];

        return <CmsListItem id={id} values={values} key={`${type}-${index}`} indexz={index} />;
      })}
    </Container>
  );
};

export default CMSSchedule;
