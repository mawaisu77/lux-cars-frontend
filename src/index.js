import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./i18n"; // Import the i18n configuration
import { CustomToast } from "./utils/Toast";
// import "./instrument";
import { SavedCarsProvider } from "./context/SavedCarIdsContext";
import { SavedLocalCarsProvider } from "./context/SavedLocalCarsIdscontext";
import { FundsProvider } from "./context/FundsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <FundsProvider>
      <SavedCarsProvider>
        <SavedLocalCarsProvider>
          <CustomToast />
          <App />
        </SavedLocalCarsProvider>
      </SavedCarsProvider>
    </FundsProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
