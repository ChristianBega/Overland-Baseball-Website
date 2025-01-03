import React, { lazy, Suspense } from "react";
import { TextField } from "@mui/material";
// import CheckBoxField from "./CheckBoxField/checkBoxField";
// import { CmsBulkActionContext } from "../../setup/context/cmsContext/cmsBulkActions.context";

const inputComponents = {
  text: lazy(() => import("./TextInputField/textInputField")),
  date: lazy(() => import("./DateInputField/dateInputField")),
  time: lazy(() => import("./TimeInputField/timeInputField")),
  checkbox: lazy(() => import("./CheckBoxField/checkBoxField")),
  numeric: lazy(() => import("./Numeric/numericInputField")),
  textarea: lazy(() => import("./TextAreaInputField/textAreaInputField")),
  file: lazy(() => import("./FileInputField/fileInputField")),
  toggleSwitch: lazy(() => import("./ToggleSwitchInputField/toggleSwitchInputField")),
};

const InputFieldComponent = ({ type, ...props }) => {
  const InputComponent = inputComponents[type];

  if (!InputComponent) {
    return <TextField variant="outlined" {...props} />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InputComponent {...props} />
    </Suspense>
  );
};

export default InputFieldComponent;
