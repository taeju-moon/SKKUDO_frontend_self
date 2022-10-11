import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import AppRouter from "./AppRouter";
import GlobalStyles from "./GlobalStyled";
import ThemeProvider from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <RecoilRoot>
            <AppRouter />
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
