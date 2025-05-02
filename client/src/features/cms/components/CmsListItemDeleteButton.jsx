import { useContext } from "react";
import { CmsEditItemContext } from "../../../features/cms/context/CmsEdit.context";
import { StyledTableCell } from "../../../styles/index.styles";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { CmsDeleteItemContext } from "../../../features/cms/context/CmsDelete.context";
import { Button } from "@mui/material";

const DeleteButtonCell = ({ id, type, values }) => {
  const { cmsOperationStatus, handleCancelEditing } = useContext(CmsEditItemContext);
  const { handleDeleteItem } = useContext(CmsDeleteItemContext);

  return (
    <StyledTableCell className="delete-button-cell">
      <Button
        onClick={() => handleDeleteItem(id, type, values, handleCancelEditing)}
        color="error"
        variant="contained"
        size="small"
        disabled={cmsOperationStatus.loading || cmsOperationStatus.success}
        aria-label="delete item"
        sx={{
          height: "136px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "0px",
        }}
      >
        <DeleteIcon />
      </Button>
    </StyledTableCell>
  );
};

export default DeleteButtonCell;
