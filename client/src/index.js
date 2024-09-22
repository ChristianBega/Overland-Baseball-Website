import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./setup/context/authentication.context";
import { UserProvider } from "./setup/context/user.context";
// import { ModalProvider } from "./setup/context/useCmsModal";
import { EditItemProvider } from "./setup/context/edit.context";
import { CmsProvider } from "./setup/context/cms.context";
import { CmsEditItemProvider } from "./setup/context/cmsEdit.context";
import { ModalProvider } from "./setup/context/modal.context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <CmsProvider>
          <ModalProvider>
            {/* <CmsEditItemProvider> */}
            <App />
            {/* </CmsEditItemProvider> */}
          </ModalProvider>
        </CmsProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
  // </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
