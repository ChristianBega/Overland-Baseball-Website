import React from "react";
import { Typography, Container, Stack, Box } from "@mui/material";
import { StyledCmsItem, StyledList } from "./index.styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { deleteCMSItem } from "../../../setup/utils/firebase/deleteItem";
const CmsListItem = ({ values, indexz, id }) => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");
  const handleDeleteCmsItem = (event) => {
    alert(`Are you sure you'd like to delete ${event.currentTarget.id}`);
    deleteCMSItem(uid, role, event.currentTarget.id, type);
  };

  return (
    <Container sx={{ padding: "0 !important" }}>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <h1 style={{ margin: 0 }}>
          {type.charAt(0).toUpperCase() + type.slice(1)} Item #{indexz + 1}
        </h1>
        <Box sx={{ display: "flex", gap: ".5rem" }}>
          <button>
            <EditIcon />
          </button>
          <button id={id} onClick={handleDeleteCmsItem}>
            <DeleteIcon />
          </button>
        </Box>
      </Stack>
      {values.map((value, index) => (
        <React.Fragment key={index}>
          <StyledList sx={{ marginBottom: "2rem" }}>
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
