import React, { createContext, useState } from "react";

export const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(null);
  // console.log("Current dashboard menu item selected", currentItem);

  return <CmsContext.Provider value={{ currentItem, setCurrentItem }}>{children}</CmsContext.Provider>;
};
