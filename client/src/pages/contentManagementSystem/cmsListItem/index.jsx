import React from "react";
import { List, Typography, ListItem, Container } from "@mui/material";
import { StyledCmsItem, StyledList } from "./index.styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
const CmsListItem = (data, index) => {
  const { away, home, date, location, opponent, time } = data.data;
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  return (
    <Container sx={{ padding: "0 !important" }}>
      <h1>
        {type.charAt(0).toUpperCase() + type.slice(1)} Item #{data.index + 1} | <EditIcon /> | <DeleteIcon />
      </h1>
      <StyledList>
        <StyledCmsItem>
          <Typography component={"p"}>
            Away: <Typography component={"span"}>{away === true ? "Yes" : "No"}</Typography>
          </Typography>
        </StyledCmsItem>
        <StyledCmsItem>
          <Typography component={"p"}>
            Home: <Typography component={"span"}>{home === true ? "Yes" : "No"}</Typography>
          </Typography>
        </StyledCmsItem>
        <StyledCmsItem>
          <Typography component={"p"}>
            Date: <Typography component={"span"}>{date}</Typography>
          </Typography>
        </StyledCmsItem>
        <StyledCmsItem>
          <Typography component={"p"} flexGrow={3}>
            Location:
            <Typography component={"span"}> {location}</Typography>
          </Typography>
        </StyledCmsItem>
        <StyledCmsItem>
          <Typography component={"p"}>
            Opponent:
            <Typography component={"span"}> {opponent}</Typography>
          </Typography>
        </StyledCmsItem>
        <StyledCmsItem>
          <Typography component={"p"}>
            Time:
            <Typography component={"span"}> {time}</Typography>
          </Typography>
        </StyledCmsItem>
      </StyledList>
    </Container>
  );
};

export default CmsListItem;
