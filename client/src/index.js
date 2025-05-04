import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { UserProvider } from "./features/auth/context/UserContext";
// import { UserProvider } from "./setup/context/user.context";
// import { CmsProvider } from "./setup/context/cmsContext/cms.context";
import { CmsProvider } from "./features/cms/context/CmsContext";

import { ModalProvider } from "./setup/context/modal.context";
import { ThemeToggleProvider } from "./setup/context/components/themeToggler.context";
import { DateNavigatorProvider } from "./pages/home/components/schedule/components/dateNavigator/dateNavigator.context";
import { CalendarProvider } from "./setup/context/components/calendar.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ThemeToggleProvider>
          <CmsProvider>
            <CalendarProvider>
              <ModalProvider>
                <DateNavigatorProvider>
                  <App />
                </DateNavigatorProvider>
              </ModalProvider>
            </CalendarProvider>
          </CmsProvider>
        </ThemeToggleProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
  // </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
