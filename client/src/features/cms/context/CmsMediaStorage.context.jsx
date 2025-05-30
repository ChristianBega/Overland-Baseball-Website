import React, { createContext, useState, useContext } from "react";

const MediaStorageContext = createContext({
  files: [],
  setFiles: () => {},
  currentFolder: "/",
  setCurrentFolder: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
});

export const useMediaStorage = () => useContext(MediaStorageContext);

export const MediaStorageProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    files,
    setFiles,
    currentFolder,
    setCurrentFolder,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return <MediaStorageContext.Provider value={value}>{children}</MediaStorageContext.Provider>;
};
