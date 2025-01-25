import { useContext } from "react";
import { StyledTableCell } from "../../../../../styles/index.styles";
import InputFieldComponent from "../../../../inputFields/inputFields";
import { CmsEditItemContext } from "../../../../../setup/context/cmsContext/cmsEdit.context";
import { CmsBulkActionContext } from "../../../../../setup/context/cmsContext/cmsBulkActions.context";
import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";

const CheckboxCell = ({ isSelected, onChange, isDisabled, id, values }) => {
  const { isSm } = useMediaQueries();
  const { cmsOperationStatus, editableItemData } = useContext(CmsEditItemContext);
  const { selectedItems, handleCheckboxChange } = useContext(CmsBulkActionContext);

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
