import React, { createContext, useState } from "react";

export const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(null);

  return <CmsContext.Provider value={{ currentItem, setCurrentItem }}>{children}</CmsContext.Provider>;
};
