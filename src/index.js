import React from "react";

import { ThemeProvider } from "@emotion/react";
import { render } from "react-dom";

import "antd/dist/antd.css";
import ImageEditor from "./ImageEditor";
import theme from "./styles/theme";
import { GlobalStyles } from "./styles/styles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ImageEditor />
    </ThemeProvider>
  );
};
render(<App />, document.getElementById("root"));
