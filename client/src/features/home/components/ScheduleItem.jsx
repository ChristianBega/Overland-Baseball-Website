import React from "react";
// Components
// import CmsOperationStatus from "../../../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import ScheduleContentEditable from "./ScheduleContentEditable";
// Styles
import { StyledTableRow } from "../../../utils/theme/index.styles";
// Utils & Helpers
import { formatDateToLongString } from "../../../utils/helpers/formatDateToString";
import ScheduleContentViewOnly from "./ScheduleContentViewOnly";

export default function ScheduleItem({ ...props }) {
  const { data, isEditable, editableData, isLoading = false, isError, isSuccess, renderAsRow = true, isCmsItem, isPast } = props;
  const currentData = isEditable ? editableData : data;
  const { date } = currentData || {};
  const formattedDate = formatDateToLongString(date);
  const formattedDateMonth = formattedDate.split(" ")[0];
  const formattedDateDay = formattedDate.split(" ")[1];

  // if (isLoading || isError || isSuccess) {
  //   return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  // }

  return (
    <>
      {isEditable || isCmsItem ? (
        renderAsRow ? (
          <StyledTableRow>
            <ScheduleContentEditable {...props} data={currentData} />
          </StyledTableRow>
        ) : (
          <ScheduleContentEditable {...props} data={currentData} />
        )
      ) : (
        <ScheduleContentViewOnly {...props} formattedDateMonth={formattedDateMonth} formattedDateDay={formattedDateDay} />
      )}
    </>
  );
}
//TODO: when i click edit, the other items in the contentEditable component are updating to the selected item....
