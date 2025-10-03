import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import '@fortawesome/fontawesome-free/css/all.css';
// import "./css/all-fontawesome.min.css";
// import "react-multi-carousel/lib/styles.css";
// import "./css/plugins.css";
// import "./css/checkout.css";
// import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import 'tailwindcss/index.css'

// import 'tailwindcss/theme.css'
// import 'tailwindcss/preflight.css'
import App from "./App.tsx";
import App2 from "./App2.tsx"
import App1 from "./App1.tsx"

const container = document.getElementById("root");

const theme = createTheme({
  // your theme config here, or leave empty for defaults
});

if (!container) {
  throw new Error("Root element with ID 'root' was not found in the document.");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          {/*<App />*/}
          <App2 />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
