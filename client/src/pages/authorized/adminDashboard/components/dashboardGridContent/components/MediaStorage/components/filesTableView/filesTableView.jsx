import { Button, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import InputFieldComponent from "../../../../../../../../../components/inputFields/inputFields";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="files table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <div>
                <InputFieldComponent type="checkbox" />
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
          {displayData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <InputFieldComponent type="checkbox" />
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
                  View File
                </a>
              </TableCell>
              <TableCell>
                <Stack direction="column" spacing={0.5}>
                  <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
                  <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
                  <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilesTableView;
