import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MobileToastProvider from "@utils/common/mobile-toast/MobileToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MobileToastProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MobileToastProvider>
);
