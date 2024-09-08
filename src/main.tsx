import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import store from "./redux/store/store.ts";
import { Provider } from "react-redux";
const theme = createTheme();
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./constants/constant_env.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
    {/* </React.StrictMode> */}
  </Provider>
);
