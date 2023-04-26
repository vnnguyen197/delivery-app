import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/index";
import { ThemeProvider } from "styled-components";
import { theme } from "theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
