import React, { createContext, useState } from "react";
// ! used to track the current cms item type the user selects from the dashboard menu.
export const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(null);
  // console.log("Current dashboard menu item selected", currentItem);

  return <CmsContext.Provider value={{ currentItem, setCurrentItem }}>{children}</CmsContext.Provider>;
};
