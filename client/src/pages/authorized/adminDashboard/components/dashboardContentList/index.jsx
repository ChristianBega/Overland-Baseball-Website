import { Box, Grid, List } from "@mui/material";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCMSItems } from "../../../../../setup/utils/firebase/getItem";
import LoadingErrorIndicator from "../../../../loadingErrorIndicator";
import CmsListItem from "../../../contentManagementSystem/cmsListItem/new";
import { EditItemContext } from "../../../../../setup/context/edit.context";
// import withEditable from "../../../contentManagementSystem/cmsListItem/components/editable";

const DashboardContentList = ({ currentItem }) => {
  // if currentItem is not present then we shouldn't run this queryKey function ....
  const queryKey = `${currentItem?.linkName.toLowerCase()}-cms`;
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchCMSItems(currentItem?.linkName?.toLowerCase()), // Ensure currentItem and linkName are defined
    enabled: !!currentItem?.linkName, // Prevent the query from running if currentItem or linkName is undefined/null
  });

  const { activeIndex, isActive, handleItemClick, setActiveIndex, setIsActive } = useContext(EditItemContext);
  let values = [{}];
  return (
    <Grid item xs={12} lg={12}>
      <Box sx={{ border: "1px solid blue", marginTop: "2rem" }}>
        <p>Add Item</p>
        <p>Search...</p>
        <div>
          <LoadingErrorIndicator isLoading={isLoading} error={error} />
          <List>
            {data &&
              data
                ?.slice(0, 10)
                .map((item, index) => (
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
          </List>
        </div>
      </Box>
    </Grid>
  );
};

export default DashboardContentList;
