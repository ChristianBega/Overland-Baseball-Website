import React from "react";
import { Pagination, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#1a2b4f",
  color: "#fff",
});

const ItemsPerPage = styled(Typography)({
  color: "#fff",
  fontSize: "14px",
});

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "#fff",
    "&.Mui-selected": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
});

const CustomPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, showItemsPerPage = true }) => {
  return (
    <PaginationContainer>
      <StyledPagination count={Math.ceil(totalItems / itemsPerPage)} page={currentPage} onChange={(e, value) => onPageChange(value)} size="small" />
      {showItemsPerPage && <ItemsPerPage>{itemsPerPage} Per Page</ItemsPerPage>}
    </PaginationContainer>
  );
};

export default CustomPagination;
