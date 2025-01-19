import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CmsUploadItem from "../../cmsUploadItem/cmsUploadItem";
import InputFieldComponent from "../../../inputFields/inputFields";

// Data
import scheduleItemInputFieldsConfig from "../addItemsForm/data/addScheduleItem.config.json";
import rosterItemInputFieldsConfig from "../addItemsForm/data/addRosterItem.config.json";
import eventsItemInputFieldsConfig from "../addItemsForm/data/addEventItem.config.json";
import documentsItemInputFieldsConfig from "../addItemsForm/data/addDocument.config.json";
import FormStatusIndicator from "../../../statusIndicators/formStatusIndicator";
import { CmsEditItemContext } from "../../../../setup/context/cmsContext/cmsEdit.context";

const EditItemsForm = ({ ...props }) => {
  // const { editableItemData, handleSaveAndUpdateItem, cmsOperationStatus, uploadType, handleFieldChange } = useContext(CmsEditItemContext);
  const { editableItemData, cmsOperationStatus } = props;

  const { cmsItemType, uid, role, closeModal } = props;
  // const { loading, error, success } = cmsOperationStatus;
  const [localUploadType, setLocalUploadType] = useState("url");

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

  // useEffect(() => {
  //   if (success || error) {
  //     const timer = setTimeout(() => {
  //       reset();
  //       closeModal();
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [success, error]);

  const handleUpdateTest = (formValues) => {
    console.log("formValues - line 52 - editItemsForm", formValues);
    // handleSaveAndUpdateItem(cmsItemType, uid, uploadType);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleUpdateTest)}>
      {/* <FormStatusIndicator loading={loading} error={error} success={success} /> */}
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
// 1. create button to save changes
// 2. create save changes function or integrate with handleSaveAndUpdateItem
// 3. restyle the modal background to match the figma design
// 4. link in the rest of the cms types (roster, events, documents, quickLinks, sponsors)
