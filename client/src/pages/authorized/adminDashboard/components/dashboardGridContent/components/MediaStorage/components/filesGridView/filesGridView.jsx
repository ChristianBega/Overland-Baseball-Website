import { Stack } from "@mui/material";
import React from "react";

const FilesGridView = ({ displayData, isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
      {displayData.map((item) => (
        <div
          style={{
            backgroundImage: `url(${item.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px dotted red",
            padding: "1rem",
            marginBottom: "1rem",
            width: "150px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
          key={item.id}
        >
          <Stack direction="column" spacing={0.5}>
            <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
            <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
            <div style={{ borderRadius: "50%", backgroundColor: "red", height: "5px", width: "5px" }}></div>
          </Stack>
          <p style={{ width: "100%", fontSize: "0.8rem", backgroundColor: "white", opacity: "0.8" }}>{item.fileName}</p>
        </div>
      ))}
    </div>
  );
};

export default FilesGridView;
