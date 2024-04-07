import React from "react";
import { Container, Box } from "@mui/material";
import { useFetchScheduleItemsList } from "../schedule/components/hooks/fetchCmsItem";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
const CMSRoster = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  const { data, isLoading, error } = useFetchScheduleItemsList(type);

  return (
    <Container>
      <h1>Hello World - CMSROSTER</h1>
      {data?.map(({ handed, height, home, name, number, position, role, userUid, weight, year, yearAbbr }, index) => {
        return (
          <Box
            key={type + index}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              p: 2,
              mb: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              width: "100%",
            }}
          >
            <p>Handed: {handed}</p>
            <p>Height: {height}</p>
            <p>Home: {home ? "Yes" : "No"}</p>
            <p>Name: {name}</p>
            <p>Number: {number}</p>
            <p>Position: {position}</p>
            <p>Role: {role}</p>
            <p>User UID: {userUid}</p>
            <p>Weight: {weight}</p>
            <p>Year: {year}</p>
            <p>Year Abbreviation: {yearAbbr}</p>
          </Box>
        );
      })}
    </Container>
  );
};

export default CMSRoster;
