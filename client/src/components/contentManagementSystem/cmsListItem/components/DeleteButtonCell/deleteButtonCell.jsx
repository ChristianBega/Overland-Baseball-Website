import { useContext } from "react";
import { CmsEditItemContext } from "../../../../../setup/context/cmsContext/cmsEdit.context";
import { StyledTableCell } from "../../../../../styles/index.styles";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { CmsDeleteItemContext } from "../../../../../setup/context/cmsContext/cmsDelete.context";

const DeleteButtonCell = ({ id, type, values }) => {
  const { cmsOperationStatus, handleCancelEditing } = useContext(CmsEditItemContext);
  const { handleDeleteItem } = useContext(CmsDeleteItemContext);

  return (
    <StyledTableCell className="delete-button-cell">
      <div
        onClick={() => handleDeleteItem(id, type, values, handleCancelEditing)}
        color="error"
        type="button"
        disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
        aria-label="delete item"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <DeleteIcon />
      </div>
    </StyledTableCell>
  );
};

export default DeleteButtonCell;
