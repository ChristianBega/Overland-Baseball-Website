import React, { Suspense } from "react";
import { Box, Button, Stack } from "@mui/material";

const CmsForm = ({ formType, ...props }) => {
  const { closeModal } = props;
  const formComponents = {
    create: React.lazy(() => import("./addItemsForm/addItemsForm")),
    bulkAdd: React.lazy(() => import("./bulkAddItemsForm/bulkAddItemsForm")),
    delete: React.lazy(() => import("./deleteItemsForm/deleteItemsForm")),
  };

  const FormComponent = formComponents[formType];

  if (!FormComponent) {
    return <p>Invalid form type specified.</p>;
  }

  return (
    <Box>
      <Stack alignItems={"center"} direction="row" justifyContent="space-between">
        <h2> Form</h2>
        <Button onClick={closeModal}>X</Button>
      </Stack>
      <Suspense fallback={<div>Loading...</div>}>
        <FormComponent {...props} />
      </Suspense>
    </Box>
  );
};

export default CmsForm;

// TODO: Create reusable input components (TextField, Select, DatePicker)
// TODO: Implement form validation and error handling
// TODO: Create a dynamic form generator based on the type of cmsListItem
// TODO: Implement CSV upload and parsing for bulk add
// TODO: Create UI for upload progress
// TODO: Implement delete functionality
