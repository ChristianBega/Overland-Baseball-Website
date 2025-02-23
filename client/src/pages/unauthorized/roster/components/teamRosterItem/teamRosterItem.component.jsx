import "./teamRosterItem.styles.css";
import { useTheme } from "@emotion/react";
// import PlaceHolderImage from "../../../../../assets/rosterPlaceHolder.png";
import CmsOperationStatus from "../../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import { StyledTableRow } from "../../../../../styles/index.styles";

import TeamContentViewOnly from "./components/rosterContentViewOnly/teamContentViewOnly.component";
import TeamContentEditable from "./components/rosterContentEditable/teamContentEditable.component";

export default function TeamRoosterItem({ ...props }) {
  const theme = useTheme();
  const { isEditable, editableData, isLoading, isError, isSuccess, renderAsRow = true, isCmsItem } = props;
  const currentData = isEditable ? editableData : props.data;

  if (isLoading || isError || isSuccess) {
    return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  }

  return (
    <>
      {isEditable || isCmsItem ? (
        renderAsRow ? (
          <StyledTableRow>
            <TeamContentEditable {...props} data={currentData} />
          </StyledTableRow>
        ) : (
          <TeamContentEditable {...props} data={currentData} />
        )
      ) : (
        <StyledTableRow>
          <TeamContentViewOnly theme={theme} {...props} />
        </StyledTableRow>
      )}
    </>
  );
}
