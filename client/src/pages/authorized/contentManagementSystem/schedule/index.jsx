import React, { useContext, useState } from "react";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useUrlQueryParams } from "../../../../setup/utils/helpers/useUrlQueryParams";
import CmsListItem from "../cmsListItem";
import LoadingErrorIndicator from "../../../loadingErrorIndicator";
import { fetchCMSItems } from "../../../../setup/utils/firebase/getItem";
import { EditItemContext } from "../../../../setup/context/edit.context";
const CMSSchedule = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["schedule-cms"], queryFn: () => fetchCMSItems("schedule") });
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let values;
  const { activeIndex, isActive, handleItemClick, setActiveIndex, setIsActive } = useContext(EditItemContext);
  console.log(data);
  return (
    <Container>
      {/* <ListComponent /> */}
      <LoadingErrorIndicator isLoading={isLoading} error={error} />
      {data?.map(({ away, home, date, location, opponent, time, id }, index) => {
        values = [{ away, home, date, location, opponent, time }];

        return (
          <CmsListItem
            id={id}
            values={values}
            key={`${type}-${index}`}
            indexz={index}
            activeIndex={activeIndex}
            isActive={activeIndex === index && isActive}
            setIsActive={setIsActive}
            onItemClick={handleItemClick}
            setActiveIndex={setActiveIndex}
          />
        );
      })}
    </Container>
  );
};

export default CMSSchedule;
