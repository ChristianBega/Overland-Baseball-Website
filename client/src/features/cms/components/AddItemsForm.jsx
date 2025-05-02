import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
// Components
import FormStatusIndicator from "../../../components/statusIndicators/formStatusIndicator";
import InputFieldComponent from "../../../components/inputFields/inputFields";
// Utils
import { handleUploadFile } from "../../../setup/utils/firebase/uploadFile";
import { addCMSItem } from "../../../setup/utils/firebase/addItem";
// Configs
import scheduleItemInputFieldsConfig from "../data/addScheduleItem.config.json";
import rosterItemInputFieldsConfig from "../data/addRosterItem.config.json";
import eventsItemInputFieldsConfig from "../data/addEventItem.config.json";
import documentsItemInputFieldsConfig from "../data/addDocument.config.json";
import { CmsUploadItem } from "../../../features/cms";

// import CmsSeasonTabOptions from "../../../components/contentManagementSystem/cmsSeasonTabOptions/cmsSeasonTabOptions";
import { CmsSeasonTabOptions } from "../../../features/cms";

const AddItemsForm = ({ ...props }) => {
  const { cmsItemType, uid, role, closeModal, setSelectedItems } = props;
  const [status, setStatus] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [localUploadType, setLocalUploadType] = useState("url");
  const [selectedSeason, setSelectedSeason] = useState("spring");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const inputFieldsConfig = {
    schedule: scheduleItemInputFieldsConfig,
    roster: rosterItemInputFieldsConfig,
    events: eventsItemInputFieldsConfig,
    documents: documentsItemInputFieldsConfig,
  };

  // Initialize form with default values for seasons
  let defaultValues = {};

  if (cmsItemType === "events") {
    defaultValues = {
      "seasons.spring.active": true,
      "seasons.summer.active": false,
      "seasons.fall.active": false,
    };
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  // Watch the event type to conditionally render fields
  const eventType = useWatch({
    control,
    name: "eventType",
    defaultValue: "",
  });

  // Handle season tab changes
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

  // Watch the active checkboxes to keep them in sync
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

  // Keep the active checkboxes in sync (only one can be active)
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

  const preprocessFormData = (data) => {
    // Skip preprocessing if not a player event
    if (data.eventType !== "player") {
      return data;
    }

    // Save the eventImage reference before JSON operations
    const eventImage = data.eventImage;

    // Create a deep copy to avoid modifying the original data
    const processedData = JSON.parse(JSON.stringify(data));

    // Restore the eventImage that was lost in JSON serialization
    processedData.eventImage = eventImage;

    // Store the current seasons data
    const currentSeasons = processedData.seasons || {};

    // Create a fresh seasons object with only the fields we want
    const freshSeasons = {
      spring: {
        startDateTime: currentSeasons.spring?.startDateTime || "",
        endDateTime: currentSeasons.spring?.endDateTime || "",
        playerEventContent: currentSeasons.spring?.playerEventContent || "",
      },
      summer: {
        startDateTime: currentSeasons.summer?.startDateTime || "",
        endDateTime: currentSeasons.summer?.endDateTime || "",
        playerEventContent: currentSeasons.summer?.playerEventContent || "",
      },
      fall: {
        startDateTime: currentSeasons.fall?.startDateTime || "",
        endDateTime: currentSeasons.fall?.endDateTime || "",
        playerEventContent: currentSeasons.fall?.playerEventContent || "",
      },
    };

    processedData.seasons = freshSeasons;

    delete processedData.startDateTime;
    delete processedData.endDateTime;

    // Add debug logging

    return processedData;
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    setSubmitAttempted(true);
    setStatusMessage("Loading...");

    // Pre-process the form data for submission
    const formData = preprocessFormData(data);

    try {
      let result;

      switch (cmsItemType) {
        case "events":
          if (localUploadType === "file" && formData.eventImage) {
            const { url } = await handleUploadFile(
              formData.eventImage,
              uid,
              () => {},
              () => {},
              "events",
              "eventImages"
            );
            const updatedData = {
              ...formData,
              eventImage: url,
            };

            result = await addCMSItem(uid, role, updatedData, cmsItemType, (progress) => {
              setProgress(progress);
            });
          } else {
            result = await addCMSItem(uid, role, formData, cmsItemType, (progress) => {
              setProgress(progress);
            });
          }
          break;

        // Other cases remain the same
        case "documents":
          result = await handleUploadFile(
            formData.documentFile,
            uid,
            (progress) => {
              setProgress(progress);
            },
            () => {},
            cmsItemType
          );
          break;
        case "schedule":
          if (localUploadType === "file" && formData.opponentIcon) {
            const { url } = await handleUploadFile(
              formData.opponentIcon,
              uid,
              () => {},
              () => {},
              "schedule",
              "opponentIcon"
            );
            const updatedData = {
              ...formData,
              opponentIcon: url,
            };
            result = await addCMSItem(uid, role, updatedData, cmsItemType, (progress) => {
              setProgress(progress);
            });
          } else {
            result = await addCMSItem(uid, role, formData, cmsItemType, (progress) => {
              setProgress(progress);
            });
          }
          break;
        case "roster":
          if (localUploadType === "file" && formData.playerImage) {
            const { url } = await handleUploadFile(
              formData.playerImage,
              uid,
              () => {},
              () => {},
              "roster",
              "playerImage"
            );
            const updatedData = {
              ...formData,
              playerImage: url,
            };
            result = await addCMSItem(uid, role, updatedData, cmsItemType, (progress) => {
              setProgress(progress);
            });
          } else {
            result = await addCMSItem(uid, role, formData, cmsItemType, (progress) => {
              setProgress(progress);
            });
          }
          break;
        default:
          result = await addCMSItem(uid, role, formData, cmsItemType, (progress) => {
            setProgress(progress);
          });
          break;
      }

      if (result && result.success === true) {
        console.log("result", result);
        setStatus("success");
        setStatusCode(200);
        setStatusMessage(result.message || "Item added successfully!");
        reset();
        setTimeout(() => {
          closeModal();
        }, 2000);
        setSelectedItems([]);
      } else {
        setStatus("error");
        setStatusCode(result?.statusCode);
        setStatusMessage(result?.error || "Error adding item. Please try again.");
        console.error("Form submission error:", result);
      }
    } catch (error) {
      console.error("Failed to add item:", error);
      setStatus("error");
      setStatusCode(error?.statusCode);
      setStatusMessage(`Error during add: ${error.message || "Unknown error"}`);
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

  // Log errors when they occur
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
    }
  }, [errors]);

  // Determine if a field should be shown based on conditional rendering rules
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

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormStatusIndicator
        statusMessage={statusMessage}
        statusCode={statusCode}
        loading={statusMessage === "Loading..."}
        error={statusMessage && statusMessage === "Failed to update item. Please try again."}
      />
      {/* <FormStatusIndicator statusMessage={statusMessage} statusCode={statusMessage} loading={statusMessage} error={statusMessage} /> */}

      <Grid container direction="column" spacing={2}>
        {inputFieldsConfig[cmsItemType]?.map((field, index) => {
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
                        error={Boolean(errors[field.name])}
                        helperText={errors[field.name]?.message}
                        {...formField}
                        optionLabels={field.optionLabels}
                        options={field.options && field.options}
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create"}
      </Button>
    </Box>
  );
};

export default AddItemsForm;
