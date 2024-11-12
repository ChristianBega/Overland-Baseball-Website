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
import CmsUploadItem from "../../cmsUploadItem/cmsUploadItem";
const AddItemsForm = ({ ...props }) => {
  const { cmsItemType, uid, role, closeModal, setSelectedItems } = props;
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [localUploadType, setLocalUploadType] = useState("url");

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
    formState: { errors },
  } = useForm();

  const handleAdd = async (data) => {
    //! refactor how we handle checking the cmsItemType to conditionally handle specific edge cases for adding items. use switch statement or if else or handleAddLogicMap.
    setStatusMessage("Loading...");
    try {
      console.log("cmsItemType", cmsItemType);
      let result;

      switch (cmsItemType) {
        case "documents":
          result = await handleUploadFile(
            data.documentFile,
            uid,
            (progress) => {
              setProgress(progress);
            },
            () => {},
            cmsItemType
          );
          break;
        case "schedule":
          if (localUploadType === "file") {
            const { url } = await handleUploadFile(
              data.opponentIcon,
              uid,
              () => {},
              () => {},
              "schedule",
              "opponentIcon"
            );
            const updatedDataWithOpponentIconUrl = {
              ...data,
              opponentIcon: url,
            };
            result = await addCMSItem(uid, role, updatedDataWithOpponentIconUrl, cmsItemType, (progress) => {
              setProgress(progress);
            });
          } else {
            result = await addCMSItem(uid, role, data, cmsItemType, (progress) => {
              setProgress(progress);
            });
          }
          break;
        case "roster":
          if (localUploadType === "file") {
            const { url } = await handleUploadFile(
              data.playerImage,
              uid,
              () => {},
              () => {},
              "roster",
              "playerImage"
            );
            const updatedDataWithPlayerImageUrl = {
              ...data,
              playerImage: url,
            };
            result = await addCMSItem(uid, role, updatedDataWithPlayerImageUrl, cmsItemType, (progress) => {
              setProgress(progress);
            });
          } else {
            console.log(
              "line 104 ________________",
              "fired while cmsItemType was",
              cmsItemType,
              "was expected to be : anything but : documents, roster, schedule "
            );
            result = await addCMSItem(uid, role, data, cmsItemType, (progress) => {
              setProgress(progress);
            });
          }
          break;
        default:
          result = await addCMSItem(uid, role, data, cmsItemType, (progress) => {
            setProgress(progress);
          });
          break;
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
      {inputFieldsConfig[cmsItemType].map(({ name, label, placeholder, type, rules, cmsType, optionLabels }, index) => (
        <Controller
          key={index + name}
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Box mb={2}>
              {type === "cmsUploadItem" ? (
                <CmsUploadItem
                  cmsItemType={cmsType}
                  onChange={(field) => (event) => {
                    field.onChange(event.target.files[0]);
                  }}
                  // onChange={field.onChange}
                  label={label}
                  placeholderTextfield={placeholder}
                  value={field.value}
                  {...field}
                  cmsUploadName={name}
                  parentElement={"addItemsForm"}
                  localUploadType={localUploadType}
                  setLocalUploadType={setLocalUploadType}
                />
              ) : (
                <InputFieldComponent
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(errors[name])}
                  helperText={errors[name]?.message}
                  {...field}
                  optionLabels={optionLabels}
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

// ! Other fields for uploading files
// url: downloadURL,
// fileName: file.name,
// fileSize: file.size,
// fileType: file.type,
