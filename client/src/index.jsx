import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { UserProvider } from "./features/auth/context/UserContext";

import { ModalProvider } from "./features/ui";
// import { ThemeToggleProvider } from "./setup/context/components/themeToggler.context";
import { ThemeToggleProvider } from "./features/themeShowcase/context/ThemeToggler.context";
import { CalendarProvider } from "./features/events/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ThemeToggleProvider>
          <CalendarProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </CalendarProvider>
        </ThemeToggleProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  // </QueryClientProvider>
);
