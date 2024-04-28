import React, { useState } from "react";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import CmsListItem from "../cmsListItem";
import LoadingErrorIndicator from "../../loadingErrorIndicator";
import { fetchCMSItems } from "../../../setup/utils/firebase/getItem";
import ListComponent from "../cmsListItem/demo";

const CMSSchedule = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let values;
  const [activeIndex, setActiveIndex] = useState(null); // State to track the clicked item
  const [isActive, setIsActive] = useState(true);
  const { data, isLoading, error } = useQuery({ queryKey: ["schedule-cms"], queryFn: () => fetchCMSItems("schedule") });

  const handleItemClick = (index) => {
    if (activeIndex === index) {
      setIsActive(!isActive); // Toggle only if clicking the same item again
    } else {
      setActiveIndex(index);
      setIsActive(true); // Set active to true when a new item is clicked
    }
  };

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
