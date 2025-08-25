import React from "react";
import { Pagination, Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import styled from "@emotion/styled";

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#1a2b4f",
  color: "#fff",
  borderRadius: "16px",
});

const ItemsPerPage = styled(Typography)({
  color: "#fff",
  fontSize: "14px",
  marginRight: "8px",
});

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "#fff",
    "&.Mui-selected": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
});

const StyledSelect = styled(Select)({
  color: "#fff",
  minWidth: "80px",
  height: "36px",
  "& .MuiSelect-select": {
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
});

const PerPageContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const CustomPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, showItemsPerPage = true, setItemsPerPage, itemsPerPageBase }) => {
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <PaginationContainer>
      <StyledPagination count={Math.ceil(totalItems / itemsPerPage)} page={currentPage} onChange={(e, value) => onPageChange(value)} size="small" />

      {showItemsPerPage && (
        <PerPageContainer>
          <ItemsPerPage>Per Page</ItemsPerPage>
          <FormControl size="small">
            <StyledSelect value={itemsPerPage} onChange={handleItemsPerPageChange} variant="outlined">
              <MenuItem value={itemsPerPageBase}>{itemsPerPageBase}</MenuItem>
              <MenuItem value={itemsPerPageBase * 2}>{itemsPerPageBase * 2}</MenuItem>
              <MenuItem value={itemsPerPageBase * 3}>{itemsPerPageBase * 3}</MenuItem>
              <MenuItem value={itemsPerPageBase * 4}>{itemsPerPageBase * 4}</MenuItem>

              {/* <MenuItem value={9}>9</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={27}>27</MenuItem> */}
            </StyledSelect>
          </FormControl>
        </PerPageContainer>
      )}
    </PaginationContainer>
  );
};

export default CustomPagination;
