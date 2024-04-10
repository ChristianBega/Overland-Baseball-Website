import React from "react";
import { Typography, Container } from "@mui/material";
import { StyledCmsItem, StyledList } from "./index.styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
const CmsListItem = ({ values, indexz }) => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");

  return (
    <Container sx={{ padding: "0 !important" }}>
      <h1>
        {type.charAt(0).toUpperCase() + type.slice(1)} Item #{indexz + 1} | <EditIcon /> | <DeleteIcon />
      </h1>
      {values.map((value, index) => (
        <React.Fragment key={index}>
          <StyledList>
            {Object.entries(value).map(([key, value], itemIndex) => (
              <StyledCmsItem key={key + itemIndex}>
                <Typography component="p" style={{ fontWeight: "bold" }}>
                  {key}: <Typography component="span">{typeof value === "boolean" ? value.toString() : value}</Typography>
                </Typography>
              </StyledCmsItem>
            ))}
          </StyledList>
        </React.Fragment>
      ))}
    </Container>
  );
};

export default CmsListItem;
