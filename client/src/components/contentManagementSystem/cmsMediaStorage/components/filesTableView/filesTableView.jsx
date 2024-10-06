import { Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import FileMenuOptions from "../fileMenuOptions/fileMenuOptions";
import PreviewIcon from "@mui/icons-material/Preview";
import InputFieldComponent from "../../../../inputFields/inputFields";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  "& > *": {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  "&.wide-cell": {
    width: "200px !important",
    minWidth: "80px !important",
  },
}));

const FilesTableView = ({ displayData, isLoading, error }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return "N/A";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) => {
      const itemId = item.id;
      const isItemSelected = prevSelected.some((selectedItem) => selectedItem.id === itemId);

      if (isItemSelected) {
        return prevSelected.filter((selectedItem) => selectedItem.id !== itemId);
      } else {
        return [...prevSelected, item];
      }
    });
  };
  const handleSelectAll = (event, displayData) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems(displayData);
    } else {
      setSelectedItems([]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer id="files-table-view" sx={{ minHeight: "400px" }} component={Paper}>
      <Table aria-label="files table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <div>
                <InputFieldComponent
                  checked={displayData?.length > 0 ? displayData?.length === selectedItems?.length : selectedItems?.length > 0}
                  type="checkbox"
                  onChange={(event) => handleSelectAll(event, displayData)}
                />
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <Typography component="p">Image</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography component="p">Name</Typography>
            </StyledTableCell>
            <StyledTableCell className="wide-cell">
              <Typography component="p">Created At</Typography>
            </StyledTableCell>
            <StyledTableCell className="wide-cell">
              <Typography component="p">File Size</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography component="p">File Type</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography component="p">URL</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography component="p">Actions</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData.map((row) => {
            const isItemSelected = selectedItems.some((item) => item.id === row.id);
            return (
              <TableRow key={row.id}>
                <TableCell>
                  <InputFieldComponent type="checkbox" checked={isItemSelected} onChange={() => handleCheckboxChange(row)} />
                </TableCell>
                <TableCell>
                  <img src={row.url} alt={row.fileName} style={{ height: "50px", width: "50px" }} />
                </TableCell>
                <TableCell>{row.fileName}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{formatFileSize(row.fileSize)}</TableCell>
                <TableCell>{row.fileType}</TableCell>
                <TableCell>
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    <PreviewIcon sx={{ cursor: "pointer", color: "green" }} />
                  </a>
                </TableCell>
                <TableCell>
                  <FileMenuOptions file={row} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilesTableView;
