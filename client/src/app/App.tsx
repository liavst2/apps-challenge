import React from "react";

import { MuiThemeProvider } from "@material-ui/core";
import { AppsPanel } from "./components/apps-panel";
import { createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, amber } from "@material-ui/core/colors";

import "./style/app.css";

const lightTheme = createMuiTheme({
	palette: {
		primary: lightBlue,
		secondary: amber
	}
});

export const App = () => (
  <MuiThemeProvider theme={lightTheme}>
    <AppsPanel />
  </MuiThemeProvider>
);
