import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CmsUploadItem from "../../cmsUploadItem/cmsUploadItem";
import InputFieldComponent from "../../../inputFields/inputFields";

// Data
import scheduleItemInputFieldsConfig from "../addItemsForm/data/addScheduleItem.config.json";
import rosterItemInputFieldsConfig from "../addItemsForm/data/addRosterItem.config.json";
import eventsItemInputFieldsConfig from "../addItemsForm/data/addEventItem.config.json";
import documentsItemInputFieldsConfig from "../addItemsForm/data/addDocument.config.json";
// Components
import FormStatusIndicator from "../../../statusIndicators/formStatusIndicator";
// Utils
import { handleUploadFile } from "../../../../setup/utils/firebase/uploadFile";
import { updateCMSItem } from "../../../../setup/utils/firebase/editItem";
import { handleSaveRename } from "../../cmsMediaStorage/components/fileMenuOptions/fileMenuOptions";

const EditItemsForm = ({ ...props }) => {
  const { editableItemData, handleChange } = props;

  const { cmsItemType, uid, role, closeModal } = props;
  const [localUploadType, setLocalUploadType] = useState("url");
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [progress, setProgress] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editableItemData,
  });

  const inputFieldsConfig = {
    schedule: scheduleItemInputFieldsConfig,
    roster: rosterItemInputFieldsConfig,
    events: eventsItemInputFieldsConfig,
    documents: documentsItemInputFieldsConfig,
    // quickLinks: quickLinksItemInputFieldsConfig,
    // sponsors: scheduleItemInputFieldsConfig,
  };

  const handleUpdateTest = async (formValues) => {
    setStatus("loading");
    setStatusMessage("Loading...");
    try {
      let result;
      switch (cmsItemType) {
        case "documents":
          result = await handleSaveRename(
            uid,
            role,
            editableItemData,
            formValues.fileName.split(".")[0],
            formValues.fileName.split(".")[1],
            () => {},
            () => {},
            cmsItemType
          );
          break;
        case "schedule":
          if (localUploadType === "file") {
            const { url } = await handleUploadFile(
              formValues.opponentIcon,
              uid,
              (progress) => setProgress(progress),
              () => {},
              "schedule",
              "opponentIcon"
            );
            const updatedDataWithOpponentIconUrl = {
              ...formValues,
              opponentIcon: url,
            };
            result = await updateCMSItem(uid, role, formValues.id, updatedDataWithOpponentIconUrl, cmsItemType);
          } else {
            result = await updateCMSItem(uid, role, formValues.id, formValues, cmsItemType);
          }
          break;
        case "roster":
          if (localUploadType === "file") {
            const { url } = await handleUploadFile(
              formValues.playerImage,
              uid,
              (progress) => setProgress(progress),
              () => {},
              "roster",
              "playerImage"
            );
            const updatedDataWithPlayerImageUrl = {
              ...formValues,
              playerImage: url,
            };
            result = await updateCMSItem(uid, role, formValues.id, updatedDataWithPlayerImageUrl, cmsItemType);
          } else {
            result = await updateCMSItem(uid, role, formValues.id, formValues, cmsItemType);
          }
          break;
        case "events":
          result = await updateCMSItem(uid, role, formValues.id, formValues, cmsItemType);
          break;
        default:
          result = await updateCMSItem(uid, role, formValues.id, formValues, cmsItemType);
          break;
      }

      if (result.success) {
        setStatus("success");
        setStatusMessage("Item updated successfully.");
        setTimeout(() => {
          reset();
          closeModal();
        }, 2000);
      } else {
        setStatus("error");
        setStatusMessage(result.error || "Failed to update item. Please try again.");
      }
    } catch (error) {
      console.error("Error updating CMS item:", error);
      setStatus("error");
      setStatusMessage("Failed to update item. Please try again.");
    }
  };
  console.log(inputFieldsConfig[cmsItemType]);
  return (
    <Box component="form" onSubmit={handleSubmit(handleUpdateTest)}>
      <FormStatusIndicator
        statusMessage={statusMessage}
        statusCode={status === "success" ? 200 : status === "error" ? 400 : null}
        loading={status === "loading"}
        error={status === "error"}
      />
      {inputFieldsConfig[cmsItemType].map(({ name, label, placeholder, type, rules, cmsType, optionLabels, options }, index) => (
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
                  onChange={field.onChange}
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
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(name)(e);
                  }}
                  error={Boolean(errors[name])}
                  helperText={errors[name]?.message}
                  {...field}
                  optionLabels={optionLabels}
                  options={options}
                />
              )}
            </Box>
          )}
        />
      ))}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        aria-label={`create ${cmsItemType} item`}
        id={`create-${cmsItemType}-cms-item-button`}
        sx={{ width: "100%" }}
      >
        Update Item
      </Button>
    </Box>
  );
};

export default EditItemsForm;
// TODO:
// 3. restyle the modal background to match the figma design
// 4. when a user clicks of a modal (onBlur?) we need to call the handleCancelEditing function to reset the state and close the modal
