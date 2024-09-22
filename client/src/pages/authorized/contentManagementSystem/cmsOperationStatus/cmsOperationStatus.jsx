import React from "react";
import { ListItem, CircularProgress } from "@mui/material";

const CmsOperationStatus = ({ isLoading, isError, isSuccess }) => {
  if (isLoading) {
    return (
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </ListItem>
    );
  }

  if (isError) {
    return <ListItem sx={{ display: "flex", justifyContent: "center" }}>There was an error. Please try again. </ListItem>;
  }

  if (isSuccess) {
    return <ListItem sx={{ display: "flex", justifyContent: "center" }}>Operation successful!</ListItem>;
  }

  return null;
};

export default CmsOperationStatus;
