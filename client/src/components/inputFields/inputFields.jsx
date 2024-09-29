import React, { lazy, Suspense, useContext } from "react";
import { Box, TextField } from "@mui/material";
import CheckBoxField from "./CheckBoxField/checkBoxField";
import { CmsBulkActionContext } from "../../setup/context/cmsBulkActions.context";

const inputComponents = {
  text: lazy(() => import("./TextInputField/textInputField")),
  date: lazy(() => import("./DateInputField/dateInputField")),
  time: lazy(() => import("./TimeInputField/timeInputField")),
  checkbox: lazy(() => import("./CheckBoxField/checkBoxField")),

  // Add more input types as needed
};

const InputFieldComponent = ({ type, ...props }) => {
  const InputComponent = inputComponents[type];

  if (!InputComponent) {
    return <TextField {...props} />;
  }

  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <InputComponent {...props} />
      </Suspense>
    </Box>
  );
};

export default InputFieldComponent;
