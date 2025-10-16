import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastProvider } from "./components/ToastProvider"; // ✅ import here
import App from "./App.tsx";

import '@fortawesome/fontawesome-free/css/all.css';
import "./css/all-fontawesome.min.css";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/plugins.css";
import "./css/style.css";
import "./css/checkout.css";
import "./index.css";

const container = document.getElementById("root");

const theme = createTheme({});

if (!container) throw new Error("Root element not found");

const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <ToastProvider> {/* ✅ wrap App inside ToastProvider */}
            <App />
          </ToastProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
