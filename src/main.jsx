import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
import AuthContextProvider from "./store/auth-context.jsx";
import GeneralContextProvider from "./store/general-context.jsx";
import App from "./App.jsx";
import "./index.css";
import "flowbite/dist/flowbite.css";

Amplify.configure(amplifyconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GeneralContextProvider>
        <App />
      </GeneralContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
