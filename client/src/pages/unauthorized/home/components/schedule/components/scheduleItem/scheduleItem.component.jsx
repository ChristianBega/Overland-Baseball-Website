import React from "react";
import { useTheme } from "@emotion/react";
// Components
import CmsOperationStatus from "../../../../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import ScheduleContentEditable from "./components/ScheduleContentEditable/scheduleContentEditable.component";
import ScheduleContentViewOnly from "./components/ScheduleContentViewOnly/scheduleContentViewOnly.component";
// Styles
import { StyledTableRow } from "../../../../../../../styles/index.styles";
// Utils & Helpers
import { formatDateToLongString } from "../../../../../../../setup/utils/helpers/formatDateToString";

export default function ScheduleItem({ ...props }) {
  const theme = useTheme();
  const { data, isEditable, editableData, isLoading, isError, isSuccess, renderAsRow = true, isCmsItem } = props;
  const currentData = isEditable ? editableData : data;
  const { date } = currentData;
  const formattedDate = formatDateToLongString(date);
  const formattedDateMonth = formattedDate.split(" ")[0];
  const formattedDateDay = formattedDate.split(" ")[1];

  if (isLoading || isError || isSuccess) {
    return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  }

  return (
    <>
      {isEditable || isCmsItem ? (
        renderAsRow ? (
          <StyledTableRow>
            <ScheduleContentEditable {...props} />
          </StyledTableRow>
        ) : (
          <ScheduleContentEditable {...props} />
        )
      ) : (
        <ScheduleContentViewOnly theme={theme} {...props} formattedDateMonth={formattedDateMonth} formattedDateDay={formattedDateDay} />
      )}
    </>
  );
}
