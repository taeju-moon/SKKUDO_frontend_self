import React from "react";
import { RecoilRoot } from "recoil";
import AppRouter from "./AppRouter";
import GlobalStyles from "./GlobalStyled";

function App() {
  return (
    <>
      <GlobalStyles />
      <RecoilRoot>
        <AppRouter />
      </RecoilRoot>
    </>
  );
}

export default App;
