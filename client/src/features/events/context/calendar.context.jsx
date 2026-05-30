import { createContext, useState } from "react";

export const CalendarContext = createContext({
  mobileCurrentSignUpStatus: "selectEvent",
  mobileCurrentEventId: null,
  setMobileCurrentSignUpStatus: () => {},
  setMobileCurrentEventId: () => {},
  handleSelectMobileEvent: () => {},
  handleClearMobileSignUpValues: () => {},
  handleMobileSignUpGoBack: () => {},
});

export const CalendarProvider = ({ children }) => {
  // ! current just mobile sign up functionality, but we can move everything calendar related to this or break it down further to component specific contexts for the calendar...
  const [mobileCurrentSignUpStatus, setMobileCurrentSignUpStatus] = useState("selectEvent");
  const [mobileCurrentEventId, setMobileCurrentEventId] = useState(null);

  const handleSelectMobileEvent = (e) => {
    setMobileCurrentEventId(Number(e.target.id));
    setMobileCurrentSignUpStatus("signUp");
  };

  const handleClearMobileSignUpValues = (closeModal) => {
    setMobileCurrentSignUpStatus("selectEvent");
    setMobileCurrentEventId(null);
    closeModal();
  };

  const handleMobileSignUpGoBack = () => {
    setMobileCurrentSignUpStatus("selectEvent");
    setMobileCurrentEventId(null);
  };
  const value = {
    mobileCurrentSignUpStatus,
    setMobileCurrentSignUpStatus,
    mobileCurrentEventId,
    setMobileCurrentEventId,
    handleSelectMobileEvent,
    handleClearMobileSignUpValues,
    handleMobileSignUpGoBack,
  };
  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
