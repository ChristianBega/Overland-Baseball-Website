import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";
import { Controller, useForm } from "react-hook-form";
import scheduleItemInputFieldsConfig from "./data/addScheduleItem.config.json";
import rosterItemInputFieldsConfig from "./data/addRosterItem.config.json";
import { addCMSItem } from "../../../../../setup/utils/firebase/addItem";
import FormStatusIndicator from "../../../../../components/statusIndicators/formStatusIndicator";
const AddItemsForm = ({ ...props }) => {
  const { cmsItemType, uid, role, closeModal } = props;
  const [status, setStatus] = useState(null);

  const inputFieldsConfig = {
    schedule: scheduleItemInputFieldsConfig,
    roster: rosterItemInputFieldsConfig,
    // events: eventsItemInputFieldsConfig,
    // quickLinks: quickLinksItemInputFieldsConfig,
    // sponsors: scheduleItemInputFieldsConfig,
    // documents: documentsItemInputFieldsConfig,
  };

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

  const handleAdd = async (data) => {
    setStatus("loading");
    try {
      const result = await addCMSItem(uid, role, data, cmsItemType);
      if (result.success === true) {
        setStatus("success");
        reset();
        setTimeout(() => {
          closeModal();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to add schedule item:", error);
      setStatus("error");
    }
  };

  // Reset status
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <Box component="form" onSubmit={handleSubmit(handleAdd)}>
      <FormStatusIndicator status={status} />
      {inputFieldsConfig[cmsItemType].map(({ name, label, placeholder, type, rules }, index) => (
        <Controller
          key={index + name}
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Box mb={2}>
              <InputFieldComponent
                type={type}
                label={label}
                placeholder={placeholder}
                fullWidth
                error={Boolean(errors[name])}
                helperText={errors[name]?.message}
                {...field}
              />
            </Box>
          )}
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </Box>
  );
};

export default AddItemsForm;
