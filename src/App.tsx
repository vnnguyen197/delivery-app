import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/index";
import { ThemeProvider } from "styled-components";
import { theme } from "theme";
import { LoadingProvider } from "contexts/LoadingContext";
import CustomLoading from "components/Loading";
import { AuthProvider } from "hooks/useAuthContext";

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <CustomLoading />
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </ThemeProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
