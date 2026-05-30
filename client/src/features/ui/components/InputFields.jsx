import React, { lazy, Suspense } from "react";
import { TextField } from "@mui/material";
// import CheckBoxField from "./CheckBoxField/checkBoxField";
// import { CmsBulkActionContext } from "../../setup/context/cmsContext/cmsBulkActions.context";

const inputComponents = {
  text: lazy(() => import("./TextInputField")),
  email: lazy(() => import("./TextInputField")),
  tel: lazy(() => import("./TextInputField")),
  password: lazy(() => import("./TextInputField")),
  date: lazy(() => import("./DateInputField")),
  time: lazy(() => import("./TimeInputField")),
  checkbox: lazy(() => import("./CheckBoxField")),
  numeric: lazy(() => import("./NumericInputField")),
  textarea: lazy(() => import("./TextAreaInputField")),
  file: lazy(() => import("./FileInputField")),
  dateTimeLocal: lazy(() => import("./DateTimeField")),
  select: lazy(() => import("./SelectInputField")),
  toggleSwitch: lazy(() => import("./ToggleSwitchInputField")),
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
