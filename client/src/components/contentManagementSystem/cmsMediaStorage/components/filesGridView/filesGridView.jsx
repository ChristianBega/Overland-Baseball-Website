import React from "react";
import FileMenuOptions from "../fileMenuOptions/fileMenuOptions";

const FilesGridView = ({ displayData, isLoading, error, selectedSubDirectory, mainDirectoryName }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", minHeight: "400px" }}>
      {displayData.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${item.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "1rem",
            marginBottom: "1rem",
            width: "150px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            boxShadow: "0px 0px 15px 0px rgb(0, 0, 0, 0.3)",
          }}
        >
          <FileMenuOptions file={item} selectedSubDirectory={selectedSubDirectory} mainDirectoryName={mainDirectoryName} />

          <p style={{ width: "100%", fontSize: "0.8rem", backgroundColor: "white", opacity: "0.8" }}>{item.fileName}</p>
        </div>
      ))}
    </div>
  );
};

export default FilesGridView;
