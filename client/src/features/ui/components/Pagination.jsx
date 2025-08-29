import React, { useEffect } from "react";
import { Pagination, Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import styled from "@emotion/styled";

const PaginationContainer = styled(Box)(({ theme, showItemsPerPage, isTransparent }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px",
  background: theme.palette.gradients.primary,
  color: "#fff",
  borderRadius: "10px",
  marginTop: "32px",
  ...(isTransparent && {
    background: "transparent",
  }),
  ...(showItemsPerPage && {
    justifyContent: "space-between",
  }),
}));

const ItemsPerPage = styled(Typography)(({ isTransparent }) => ({
  color: isTransparent ? "#000" : "#fff",
  fontSize: "14px",
  marginRight: "8px",
}));

const StyledPagination = styled(Pagination)(({ isTransparent }) => ({
  "& .MuiPaginationItem-root": {
    color: "#fff",
    "&.Mui-selected": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    ...(isTransparent && {
      height: "36px",
      width: "36px",
      borderRadius: "50%",
      backgroundColor: "transparent",
      color: "#000",
      "&.Mui-selected": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    }),
  },
}));

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

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  showItemsPerPage = true,
  setItemsPerPage,
  itemsPerPageBase,
  isTransparent = false,
}) => {
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  console.log("showItemsPerPage", showItemsPerPage);

  useEffect(() => {
    setItemsPerPage(itemsPerPageBase);
  }, [itemsPerPageBase, setItemsPerPage]);

  return (
    <PaginationContainer showItemsPerPage={showItemsPerPage} isTransparent={isTransparent}>
      <StyledPagination
        isTransparent={isTransparent}
        count={Math.ceil(totalItems / itemsPerPage)}
        page={currentPage}
        onChange={(e, value) => onPageChange(value)}
        size="small"
      />

      {showItemsPerPage && (
        <PerPageContainer>
          <ItemsPerPage isTransparent={isTransparent}>Per Page</ItemsPerPage>
          <FormControl size="small">
            <StyledSelect value={itemsPerPage} onChange={handleItemsPerPageChange} variant="outlined">
              <MenuItem value={itemsPerPageBase}>{itemsPerPageBase}</MenuItem>
              <MenuItem value={itemsPerPageBase * 2}>{itemsPerPageBase * 2}</MenuItem>
              <MenuItem value={itemsPerPageBase * 3}>{itemsPerPageBase * 3}</MenuItem>
            </StyledSelect>
          </FormControl>
        </PerPageContainer>
      )}
    </PaginationContainer>
  );
};

export default CustomPagination;
