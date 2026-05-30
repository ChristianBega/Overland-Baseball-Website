import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ViewToggleContext = createContext();

export const useViewToggle = () => {
  const context = useContext(ViewToggleContext);
  if (!context) {
    throw new Error("useViewToggle must be used within a ViewToggleProvider");
  }
  return context;
};

export const ViewToggleProvider = ({ children, defaultView = "grid" }) => {
  const [view, setView] = useState(defaultView);

  const toggleView = (newView) => {
    setView(newView);
  };

  const value = {
    view,
    setView: toggleView,
    isTableView: view === "table",
    isGridView: view === "grid",
  };

  return <ViewToggleContext.Provider value={value}>{children}</ViewToggleContext.Provider>;
};

ViewToggleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultView: PropTypes.oneOf(["table", "grid"]),
};
