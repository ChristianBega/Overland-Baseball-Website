import React, { useEffect, useState } from "react";
import { Typography, Container, Stack, Box, TextField } from "@mui/material";
import { StyledCmsItem, StyledCmsItemContainer, StyledList } from "./index.styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { useModal } from "../../../setup/context/useCmsModal";
import CmsModal from "../cmsModal";
const CmsListItem = ({ values, indexz, id, activeIndex, isActive, onItemClick }) => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  const { requestDelete, isModalOpen } = useModal();
  const handleDeleteCmsItem = (event) => {
    requestDelete(event.currentTarget.id, type);
  };
  const handleEditCmsItem = (event) => {
    console.log("test");
    // requestDelete(event.currentTarget.id, type);
  };

  return (
    <StyledCmsItemContainer key={indexz} selected={activeIndex === indexz} isActive={isActive}>
      {isModalOpen && <CmsModal />}
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <h1 style={{ margin: 0 }}>
          {type.charAt(0).toUpperCase() + type.slice(1)} Item #{indexz + 1}
        </h1>
        <Box sx={{ display: "flex", gap: ".5rem" }}>
          {isActive ? (
            <button onClick={handleEditCmsItem}>
              <SaveAsIcon />
            </button>
          ) : (
            <button id={indexz} onClick={() => onItemClick(indexz)}>
              <EditIcon />
            </button>
          )}
          {!isActive && (
            <button id={id} onClick={handleDeleteCmsItem}>
              <DeleteIcon />
            </button>
          )}
        </Box>
      </Stack>
      {values.map((value, index) => (
        <React.Fragment key={index}>
          <StyledList sx={{ marginBottom: "2rem" }}>
            {Object.entries(value).map(([key, value], itemIndex) => (
              <StyledCmsItem key={key + itemIndex}>
                {isActive ? (
                  <>
                    <TextField sx={{ width: "100%" }} label={key} variant="outlined" value={value}></TextField>
                  </>
                ) : (
                  <Typography component="p" style={{ fontWeight: "bold" }}>
                    {key}: <Typography component="span">{typeof value === "boolean" ? value.toString() : value}</Typography>
                  </Typography>
                )}
              </StyledCmsItem>
            ))}
          </StyledList>
        </React.Fragment>
      ))}
    </StyledCmsItemContainer>
  );
};

export default CmsListItem;
