import React from "react";
import { ThemeProvider } from "styled-components";

const Theme = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Theme;
