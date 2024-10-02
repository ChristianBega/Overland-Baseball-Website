import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

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
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>File Size</TableCell>
            <TableCell>File Type</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData.map((row) => (
            <TableRow key={row.id}>
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
