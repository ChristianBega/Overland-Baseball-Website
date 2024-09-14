import React, { useState } from "react";
import FormHeader from "../../../../../unauthorized/authentication/components/formHeader/formHeader.component";
// import { Form } from "@mui/material";
import { addCMSItem } from "../../../../../../setup/utils/firebase/addItem";

import createRosterItemInputFields from "./createRosterItemInputFields.config.json";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Checkbox, Typography, Button } from "@mui/material";
import { useUrlQueryParams } from "../../../../../../setup/utils/helpers/useUrlQueryParams";
const rosterItem = {
  name: "",
  number: "",
  position: "",
  height: "",
  weight: "",
  handed: "", // Left Or Right
  year: "",
  yearAbbr: "", // Sr. Jr. So. Fr.
};
// const buttonActions = {
//   schedule: (uid, role, data, type) => addCMSItem(uid, role, data, type),
// };

const CreateRosterItemForm = () => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      home: false,
      away: false,
    },
  });

  const handleAdd = async (data, e) => {
    try {
      const result = await addCMSItem(uid, role, data, type);
      if (result.success === true) {
        setStatus(true);
        reset();
        navigate(`/cms-edit?type=${type}&role=${role}&uid=${uid}`);
      }
    } catch (error) {
      console.error("Failed to add schedule item:", error);
    }
  };

  return (
    <form data-btntype={type} onSubmit={handleSubmit(handleAdd)} style={{ display: "flex", flexDirection: "column", gap: "1rem  " }}>
      <FormHeader formHeaderContent={"Create Roster Item"} />
      {createRosterItemInputFields.map(({ name, label, placeholder, type, rules }, index) => {
        return (
          <Controller
            required
            key={index + name}
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
              return (
                <>
                  {(type === "text" || type === "date" || type === "time") && (
                    <TextField
                      id={name}
                      type={type}
                      error={Boolean(errors[name])}
                      variant="outlined"
                      helperText={errors[name]?.message}
                      label={label}
                      placeholder={placeholder}
                      variable
                      {...field}
                    />
                  )}
                </>
              );
            }}
          />
        );
      })}
      <Button type="submit">Create Item</Button>
    </form>
  );
};

export default CreateRosterItemForm;
