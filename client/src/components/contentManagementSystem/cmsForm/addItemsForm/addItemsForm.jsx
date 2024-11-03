import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// Components
import FormStatusIndicator from "../../../../components/statusIndicators/formStatusIndicator";
import InputFieldComponent from "../../../inputFields/inputFields";
// Utils
import { handleUploadFile } from "../../../../setup/utils/firebase/uploadFile";
import { addCMSItem } from "../../../../setup/utils/firebase/addItem";
// Configs
import scheduleItemInputFieldsConfig from "./data/addScheduleItem.config.json";
import rosterItemInputFieldsConfig from "./data/addRosterItem.config.json";
import eventsItemInputFieldsConfig from "./data/addEventItem.config.json";
import documentsItemInputFieldsConfig from "./data/addDocument.config.json";
const AddItemsForm = ({ ...props }) => {
  const { cmsItemType, uid, role, closeModal, setSelectedItems } = props;
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [progress, setProgress] = useState(0);

  const inputFieldsConfig = {
    schedule: scheduleItemInputFieldsConfig,
    roster: rosterItemInputFieldsConfig,
    events: eventsItemInputFieldsConfig,
    documents: documentsItemInputFieldsConfig,
    // quickLinks: quickLinksItemInputFieldsConfig,
    // sponsors: scheduleItemInputFieldsConfig,
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAdd = async (data) => {
    setStatusMessage("Loading...");
    try {
      let result;
      if (cmsItemType === "documents") {
        //& handle upload file with handle both uploading to the database and the storage
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
        //& addCmsItem is for non storage items, they will be directly uploaded to there respective collections using their cmsItemType

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

  // ! this works but doesn't log???, i should be manually setting the value, but im not sure this is event working, and if this isn't working, then something under the hood with react-hook-form is handling this.... need to look into this more
  const handleFileChange = (file) => {
    console.log("line 79 - file", file);
    console.log("line 79 - typeof file", typeof file);
    setValue("documentFile", file); // Manually set the file object
  };

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
      {/* Add Cms Loading Status Indicator for state - a) progress */}
      {inputFieldsConfig[cmsItemType].map(({ name, label, placeholder, type, rules }, index) => (
        <Controller
          key={index + name}
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Box mb={2}>
              <InputFieldComponent
                onChange={type === "file" ? handleFileChange : field.onChange}
                type={type}
                label={label}
                placeholder={placeholder}
                fullWidth
                value={type === "file" ? undefined : field.value}
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

// ! ideas
// turn location input field into a dropdown menu with a list of locations
// turn opponent Icon input into dropdown menu with a list of icons OR upload your own
// turn opponent type input into dropdown menu with a list of types OR upload your own

// ! Other fields for uploading files
// url: downloadURL,
// fileName: file.name,
// fileSize: file.size,
// fileType: file.type,
