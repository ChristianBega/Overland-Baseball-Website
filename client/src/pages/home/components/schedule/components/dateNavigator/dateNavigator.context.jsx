import React, { createContext, useState, useContext } from "react";

const DateNavigatorContext = createContext();

export const DateNavigatorProvider = ({ children }) => {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    return startOfWeek;
  });

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  return <DateNavigatorContext.Provider value={{ currentWeek, handlePrevWeek, handleNextWeek }}>{children}</DateNavigatorContext.Provider>;
};

export const useDateNavigator = () => useContext(DateNavigatorContext);
