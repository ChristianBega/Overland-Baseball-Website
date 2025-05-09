import { useContext } from "react";
import { StyledTableCell } from "../../../styles/index.styles";
import InputFieldComponent from "../../../features/ui/components/InputFields";
import { CmsEditItemContext } from "../../../features/cms/context/CmsEdit.context";
import { CmsBulkActionContext } from "../../../features/cms/context/CmsBulkActions.context";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const CheckboxCell = ({ isSelected, id, values }) => {
  const { isSm } = useMediaQueries();
  const { cmsOperationStatus, editableItemData } = useContext(CmsEditItemContext);
  const { handleCheckboxChange } = useContext(CmsBulkActionContext);

  return (
    <StyledTableCell className={`table-cell-cms-list-item ${isSm ? "table-header-cell-narrow" : ""}`}>
      <InputFieldComponent
        type="checkbox"
        isDisabled={cmsOperationStatus.loading || cmsOperationStatus.success || editableItemData}
        checked={isSelected}
        onChange={() => handleCheckboxChange({ id, ...values[0] })}
        inputProps={{ "aria-label": "select item checkbox" }}
      />
    </StyledTableCell>
  );
};

export default CheckboxCell;
