import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/index";
import { ThemeProvider } from "styled-components";
import { theme } from "theme";
import { LoadingProvider } from "contexts/LoadingContext";
import CustomLoading from "components/Loading";

function App() {
  return (
    <LoadingProvider>
      <CustomLoading />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </ThemeProvider>
    </LoadingProvider>
  );
}

export default App;
