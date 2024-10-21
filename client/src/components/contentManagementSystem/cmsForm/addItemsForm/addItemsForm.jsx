import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { addCMSItem } from "../../../../setup/utils/firebase/addItem";
import FormStatusIndicator from "../../../../components/statusIndicators/formStatusIndicator";
import InputFieldComponent from "../../../inputFields/inputFields";
// Configs
import scheduleItemInputFieldsConfig from "./data/addScheduleItem.config.json";
import rosterItemInputFieldsConfig from "./data/addRosterItem.config.json";
import eventsItemInputFieldsConfig from "./data/addEventItem.config.json";
import documentsItemInputFieldsConfig from "./data/addDocument.config.json";
import CmsUploadItem from "../../cmsUploadItem/cmsUploadItem";
import { handleUploadFile } from "../../../../setup/utils/firebase/uploadFile";
const AddItemsForm = ({ ...props }) => {
  const { cmsItemType, uid, role, closeModal, setSelectedItems } = props;
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [progress, setProgress] = useState(0);

  const inputFieldsConfig = {
    schedule: scheduleItemInputFieldsConfig,
    roster: rosterItemInputFieldsConfig,
    events: eventsItemInputFieldsConfig,
    // quickLinks: quickLinksItemInputFieldsConfig,
    // sponsors: scheduleItemInputFieldsConfig,
    documents: documentsItemInputFieldsConfig,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAdd = async (data) => {
    // so when i click to create, i should be seeing this realtime data update....
    setStatusMessage("Loading...");
    try {
      let result;
      if (cmsItemType === "documents") {
        result = await handleUploadFile(
          data.documentFile,
          uid,
          (progress) => {
            setProgress(progress);
          },
          () => {},
          cmsItemType
        );
      } else {
        result = await addCMSItem(uid, role, data, cmsItemType, (progress) => {
          setProgress(progress);
        });
        // // handleUploadFile(file, uid, setProgress, onCancel, cmsItemType);
      }
      if (result.success === true) {
        setStatusMessage(result.message);
        reset();
        setTimeout(() => {
          closeModal();
        }, 2000);
        setSelectedItems([]);
      } else {
        setStatusMessage(result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("Failed to add schedule item:", error);
      setStatusMessage("Error during add. Check the console for more details.");
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
      <FormStatusIndicator statusMessage={statusMessage} />
      {inputFieldsConfig[cmsItemType].map(({ name, label, placeholder, type, rules }, index) => (
        <Controller
          key={index + name}
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Box mb={2}>
              {type === "file" ? (
                <CmsUploadItem
                  label={label}
                  placeholderTextfield={placeholder}
                  value={field.value?.file || field.value}
                  error={Boolean(errors[name])}
                  helperText={errors[name]?.message}
                  {...field}
                />
              ) : (
                <InputFieldComponent
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  fullWidth
                  error={Boolean(errors[name])}
                  helperText={errors[name]?.message}
                  {...field}
                />
              )}
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

// turn location input field into a dropdown menu with a list of locations
// turn opponent Icon input into dropdown menu with a list of icons OR upload your own
// turn opponent type input into dropdown menu with a list of types OR upload your own
