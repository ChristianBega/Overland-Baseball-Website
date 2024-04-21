import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, Box, Stack } from "@mui/material";
import { styled } from "@mui/material";
import { useModal } from "../../../setup/context/useCmsModal";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { deleteCMSItem } from "../../../setup/utils/firebase/deleteItem";
import { useQuery } from "@tanstack/react-query";
import { fetchCMSItemById } from "../../../setup/utils/firebase/getItem";
// import LoadingErrorIndicator from "../../loadingErrorIndicator";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 10,
};
const StyledModal = styled(Modal)(({ theme }) => ({
  background: "linear-gradient(153deg, rgba(9,31,64,0.3) 51%, rgba(0,154,78,0.3) 98%) !important",
  opacity: ".4",
  backdropFilter: "blur(2px)",
}));

const CmsModal = () => {
  const { isModalOpen, modalContent, closeModal, cmsType } = useModal();
  const [matchedCachedItem, setMatchedCachedItem] = useState(null);
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");

  const { data, isLoading } = useQuery({
    queryKey: [`${cmsType}-cms`],
    queryFn: () => fetchCMSItemById(cmsType, modalContent),
    staleTime: 600000,
  });

  useEffect(() => {
    if (!isLoading && data) {
      const cachedItem = data.find((item) => item.id === modalContent);
      if (cachedItem) {
        setMatchedCachedItem(cachedItem);
      } else {
        return setMatchedCachedItem(data);
      }
    }
  }, [modalContent, data, isLoading]);

  const handleConfirm = () => {
    deleteCMSItem(uid, role, modalContent, type);
    closeModal();
  };

  return (
    <StyledModal open={isModalOpen} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      {/* <LoadingErrorIndicator isLoading={isLoading} error={error} /> */}

      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="p" mb={2}>
          Are you sure you'd like to delete
        </Typography>
        <Stack>
          <Typography component={"h5"} variant="h6">
            {type.charAt(0).toUpperCase() + type.slice(1)} Item
          </Typography>
          <Typography component={"small"}>
            #<span style={{ display: "'block" }}>{modalContent}</span>
          </Typography>
        </Stack>
        <Box id="modal-modal-description" sx={{ my: 4, display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {matchedCachedItem &&
            Object?.entries(matchedCachedItem)?.map(([key, value]) => (
              <div key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.toString()}
              </div>
            ))}
        </Box>
        <Stack direction={"row"} spacing={"1rem"}>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button sx={{ backgroundColor: "red" }} onClick={closeModal}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </StyledModal>
  );
};

export default CmsModal;
