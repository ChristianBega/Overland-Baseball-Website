import React from "react";
import { Container, Box } from "@mui/material";

import { useFetchCMSItemsList } from "./hooks/fetchCmsItem";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import CmsListItem from "../cmsListItem";

const CMSSchedule = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  // let role = queryParams.get("role");
  // let uid = queryParams.get("uid");
  const { data, isLoading, error } = useFetchCMSItemsList(type);

  return (
    <Container>
      {data?.map((data, index) => {
        return (
          <CmsListItem data={data} key={`${type}-${index}`} index={index} />

          // <Box
          //   key={type + index}
          //   sx={{
          //     display: "flex",
          //     flexDirection: "row",
          //     alignItems: "flex-start",
          //     p: 2,
          //     mb: 2,
          //     border: "1px solid #ccc",
          //     borderRadius: "8px",
          //     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          //     width: "100%",
          //   }}
          // >
          //   <p>Away: {away === true ? "Yes" : "No"}</p>
          //   <p>Home: {home === true ? "Yes" : "No"}</p>
          //   <p>Date: {date}</p>
          //   <p>Location: {location}</p>
          //   <p>Opponent: {opponent}</p>
          //   <p>Time: {time}</p>
          // </Box>
        );
      })}
    </Container>
  );
};

export default CMSSchedule;
