import React from "react"; // eslint-disable-line no-unused-vars

import { StoreProvider } from "./context/store-context";
import ThemeProvider from "./theme/provider";

function App({ children }) {
  return (
    <ThemeProvider>
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
}

export default App;
