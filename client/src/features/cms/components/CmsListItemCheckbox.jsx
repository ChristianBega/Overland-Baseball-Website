import { useContext } from "react";
import InputFieldComponent from "../../../features/ui/components/InputFields";
import { CmsEditItemContext } from "../../../features/cms/context/CmsEdit.context";
import { CmsBulkActionContext } from "../../../features/cms/context/CmsBulkActions.context";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { StyledTableCell } from "../../ui/components/DataTable";

const CheckboxCell = ({ isSelected, id, values }) => {
  const { isMd } = useMediaQueries();
  const { cmsOperationStatus, editableItemData } = useContext(CmsEditItemContext);
  const { handleCheckboxChange } = useContext(CmsBulkActionContext);

  return (
    <StyledTableCell>
      <InputFieldComponent
        type="checkbox"
        isDisabled={cmsOperationStatus.loading || cmsOperationStatus.success || editableItemData}
        checked={isSelected}
        onChange={() => handleCheckboxChange({ id, ...values[0] })}
        inputProps={{ "aria-label": "select item checkbox" }}
        sx={{ border: "1px solid red" }}
        padding={isMd ? ".75rem" : "0px"}
      />
    </StyledTableCell>
  );
};

export default CheckboxCell;
