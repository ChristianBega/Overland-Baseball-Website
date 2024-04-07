import React, { useState } from "react";
import FormHeader from "../../../../unauthorized/authentication/components/formHeader/formHeader.component";
// import { Form } from "@mui/material";
import { addScheduleItem } from "../../../../../setup/utils/firebase/addItem";

import createScheduleItemInputFields from "./createScheduleItemInputFields.config.json";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Checkbox, Typography, Button } from "@mui/material";
import { useUrlQueryParams } from "../../../../../setup/utils/helpers/useUrlQueryParams";
// const scheduleItem = {
//   date: "",
//   time: "",
//   opponent: "",
//   opponentIcon: "",
//   location: "",
//   home: "", // boolean
//   away: "", // boolean
// };
const buttonActions = {
  schedule: (uid, role, data) => addScheduleItem(uid, role, data),
};

const CreateScheduleItemForm = () => {
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
    const buttonType = e.target.dataset.btntype;
    try {
      const result = await buttonActions[buttonType](uid, role, data);
      if (result.success === true) {
        setStatus(true);
        reset();
        alert(status);
        navigate(`/cms-edit?type=${type}&role=${role}&uid=${uid}`);
      }
    } catch (error) {
      console.error("Failed to add schedule item:", error);
    }
  };

  return (
    <form data-btntype={type} onSubmit={handleSubmit(handleAdd)} style={{ display: "flex", flexDirection: "column" }}>
      <FormHeader formHeaderContent={"Create Schedule Item"} />
      {createScheduleItemInputFields.map(({ name, label, placeholder, type, rules }, index) => {
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
                  <Typography component={"p"} variant="p" mb={2}>
                    {label}
                  </Typography>
                  {(type === "text" || type === "date" || type === "time") && (
                    <TextField
                      id={name}
                      type={type}
                      error={Boolean(errors[name])}
                      variant="outlined"
                      helperText={errors[name]?.message}
                      variable
                      {...field}
                    />
                  )}
                  {type === "checkbox" && (
                    <div>
                      <Checkbox
                        sx={{ display: "inline-block" }}
                        defaultUnchecked
                        id={name}
                        type={type}
                        error={Boolean(errors[name])}
                        variant="outlined"
                        helperText={errors[name]?.message}
                        variable
                        {...field}
                        checked={field.value}
                      />
                    </div>
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

export default CreateScheduleItemForm;
