import React from "react";
import { RecoilRoot } from "recoil";
import AppRouter from "./AppRouter";
import GlobalStyles from "./GlobalStyled";
import ThemeProvider from "./theme";

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <RecoilRoot>
          <AppRouter />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
