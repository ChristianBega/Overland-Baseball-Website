import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { CmsUploadItem } from "../../../features/cms";

import InputFieldComponent from "../../../components/inputFields/inputFields";
// import CmsSeasonTabOptions from "../../../components/contentManagementSystem/cmsSeasonTabOptions/cmsSeasonTabOptions";
import { CmsSeasonTabOptions } from "../../../features/cms";

// Data
import scheduleItemInputFieldsConfig from "../data/addScheduleItem.config.json";
import rosterItemInputFieldsConfig from "../data/addRosterItem.config.json";
import eventsItemInputFieldsConfig from "../data/addEventItem.config.json";
import documentsItemInputFieldsConfig from "../data/addDocument.config.json";
// Components
import FormStatusIndicator from "../../../components/statusIndicators/formStatusIndicator";
// Utils
import { handleUploadFile } from "../../../setup/utils/firebase/uploadFile";
import { updateCMSItem } from "../../../setup/utils/firebase/editItem";
import { handleSaveRename } from "./CmsMediaStorageFileMenuOptions";

const EditItemsForm = ({ ...props }) => {
  const { editableItemData } = props;

  const { cmsItemType, uid, role, closeModal } = props;
  const [localUploadType, setLocalUploadType] = useState("url");
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(() => {
    if (editableItemData?.seasons) {
      if (editableItemData.seasons.spring?.active) return "spring";
      if (editableItemData.seasons.summer?.active) return "summer";
      if (editableItemData.seasons.fall?.active) return "fall";
    }
    return "spring";
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...editableItemData,
      eventType: editableItemData?.eventType || "",
      ...(cmsItemType === "events" && {
        seasons: editableItemData?.seasons || {
          spring: { active: true },
          summer: { active: false },
          fall: { active: false },
        },
      }),
    },
  });

  const eventType = useWatch({
    control,
    name: "eventType",
    defaultValue: editableItemData?.eventType || "",
  });

  const springActive = useWatch({
    control,
    name: "seasons.spring.active",
    defaultValue: true,
  });

  const summerActive = useWatch({
    control,
    name: "seasons.summer.active",
    defaultValue: false,
  });

  const fallActive = useWatch({
    control,
    name: "seasons.fall.active",
    defaultValue: false,
  });

  const inputFieldsConfig = {
    schedule: scheduleItemInputFieldsConfig,
    roster: rosterItemInputFieldsConfig,
    events: eventsItemInputFieldsConfig,
    documents: documentsItemInputFieldsConfig,
    // quickLinks: quickLinksItemInputFieldsConfig,
    // sponsors: scheduleItemInputFieldsConfig,
  };

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);

    if (season === "spring") {
      setValue("seasons.spring.active", true);
      setValue("seasons.summer.active", false);
      setValue("seasons.fall.active", false);
    } else if (season === "summer") {
      setValue("seasons.spring.active", false);
      setValue("seasons.summer.active", true);
      setValue("seasons.fall.active", false);
    } else if (season === "fall") {
      setValue("seasons.spring.active", false);
      setValue("seasons.summer.active", false);
      setValue("seasons.fall.active", true);
    }
  };

  useEffect(() => {
    if (cmsItemType === "events" && springActive) {
      setValue("seasons.summer.active", false);
      setValue("seasons.fall.active", false);
    }
  }, [springActive, setValue, cmsItemType]);

  useEffect(() => {
    if (cmsItemType === "events" && summerActive) {
      setValue("seasons.spring.active", false);
      setValue("seasons.fall.active", false);
    }
  }, [summerActive, setValue, cmsItemType]);

  useEffect(() => {
    if (cmsItemType === "events" && fallActive) {
      setValue("seasons.spring.active", false);
      setValue("seasons.summer.active", false);
    }
  }, [fallActive, setValue, cmsItemType]);

  useEffect(() => {
    if (editableItemData?.eventType) {
      setValue("eventType", editableItemData.eventType);
    }
  }, [editableItemData, setValue]);

  const shouldShowField = (field) => {
    if (!field.showWhen) return true;

    const { showWhen } = field;

    // For fields that depend on eventType
    if (showWhen.field === "eventType") {
      // Handle the case where the field should NOT be shown for a specific value
      if (showWhen.notValue) {
        // If notValue is an array, check if eventType is in the array
        if (Array.isArray(showWhen.notValue)) {
          if (showWhen.notValue.includes(eventType)) return false;
        } else if (eventType === showWhen.notValue) {
          return false;
        }
      }

      // Handle the case where the field should be shown for a specific value
      if (showWhen.value) {
        // If value is an array, check if eventType is in the array
        if (Array.isArray(showWhen.value)) {
          if (!showWhen.value.includes(eventType)) return false;
        } else if (eventType !== showWhen.value) {
          return false;
        }
      }

      // If there's also a dependency on selected season
      if (showWhen.additionalField === "seasonSelect") {
        return selectedSeason === showWhen.additionalValue;
      }

      return true;
    }

    return true;
  };

  const handleUpdateTest = async (formValues) => {
    // console.log("formValues", formValues);
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
          if (localUploadType === "file") {
            console.log("start upload");
            const { url } = await handleUploadFile(
              formValues.eventImage,
              uid,
              (progress) => setProgress(progress),
              () => {},
              "events",
              "eventImages"
            );
            console.log("upload complete");
            const updatedDataWithEventImageUrl = {
              ...formValues,
              eventImage: url,
            };
            console.log("start updateCMSItem");
            result = await updateCMSItem(uid, role, formValues.id, updatedDataWithEventImageUrl, cmsItemType);
            console.log("updateCMSItem complete");
          } else {
            result = await updateCMSItem(uid, role, formValues.id, formValues, cmsItemType);
          }
          break;
        default:
          result = await updateCMSItem(uid, role, formValues.id, formValues, cmsItemType);
          break;
      }

      if (result.success) {
        setStatus("success");
        setStatusCode(200);
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
  return (
    <Box component="form" onSubmit={handleSubmit(handleUpdateTest)}>
      <FormStatusIndicator
        statusMessage={statusMessage}
        statusCode={statusCode}
        loading={statusMessage === "Loading..."}
        error={statusMessage && statusMessage === "Failed to update item. Please try again."}
      />

      <Grid container direction="column" spacing={2} mb={4}>
        {inputFieldsConfig[cmsItemType].map((field, index) => {
          if (!shouldShowField(field)) {
            return null;
          }

          return (
            <Grid key={index} item xs={12}>
              <Controller
                key={index + field.name}
                name={field.name}
                control={control}
                rules={field.rules}
                render={({ field: formField }) => (
                  <>
                    {field.type === "cmsUploadItem" ? (
                      <CmsUploadItem
                        cmsItemType={field.cmsType}
                        // onChange={formField.onChange}
                        onChange={(formField) => (event) => {
                          formField.onChange(event.target.files[0]);
                        }}
                        label={field.label}
                        placeholderTextfield={field.placeholder}
                        value={formField.value}
                        {...formField}
                        cmsUploadName={field.name}
                        parentElement={"addItemsForm"}
                        localUploadType={localUploadType}
                        setLocalUploadType={setLocalUploadType}
                      />
                    ) : field.type === "seasonTabs" ? (
                      <CmsSeasonTabOptions
                        label={field.label}
                        options={field.options}
                        value={selectedSeason}
                        onChange={handleSeasonChange}
                        error={Boolean(errors[field.name])}
                        helperText={errors[field.name]?.message}
                      />
                    ) : (
                      <InputFieldComponent
                        type={field.type}
                        label={field.label}
                        placeholder={field.placeholder}
                        fullWidth
                        value={formField.value}
                        onChange={formField.onChange}
                        // onChange={(e) => {
                        //   formField.onChange(e);
                        //   handleChange(field.name)(e);
                        // }}
                        error={Boolean(errors[field.name])}
                        helperText={errors[field.name]?.message}
                        {...formField}
                        optionLabels={field.optionLabels}
                        options={field.options}
                      />
                    )}
                  </>
                )}
              />
            </Grid>
          );
        })}
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        aria-label={`create ${cmsItemType} item`}
        id={`create-${cmsItemType}-cms-item-button`}
        sx={{ width: "100%", marginTop: "1rem" }}
      >
        Update Item
      </Button>
    </Box>
  );
};

export default EditItemsForm;

// 1. i need to enable the toggle functionality for the seasons tab, showField logic, etc.
