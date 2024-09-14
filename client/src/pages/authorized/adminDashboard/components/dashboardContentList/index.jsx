import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCMSItems } from "../../../../../setup/utils/firebase/getItem";
import LoadingErrorIndicator from "../../../../loadingErrorIndicator";
import CmsListItem from "../../../contentManagementSystem/cmsListItem";
import { EditItemContext } from "../../../../../setup/context/edit.context";

const DashboardContentList = ({ currentItem }) => {
  const queryKey = `${currentItem?.linkName.toLowerCase()}-cms`;
  const { data, isLoading, error } = useQuery({ queryKey: [queryKey], queryFn: () => fetchCMSItems(currentItem.linkName.toLowerCase()) });
  const { activeIndex, isActive, handleItemClick, setActiveIndex, setIsActive } = useContext(EditItemContext);
  let values = [{}];
  return (
    <Grid item xs={12} lg={12}>
      <Box sx={{ border: "1px solid blue", marginTop: "2rem" }}>
        <p>Add Item</p>
        <p>Search...</p>
        <div>
          <LoadingErrorIndicator isLoading={isLoading} error={error} />
          {data?.slice(0, 1).map((item, index) => (
            <CmsListItem
              id={item.id}
              indexz={index}
              values={[item]}
              key={`${currentItem}-${index}`}
              activeIndex={activeIndex}
              isActive={activeIndex === index && isActive}
              setIsActive={setIsActive}
              onItemClick={handleItemClick}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </Box>
    </Grid>
  );
};

export default DashboardContentList;
