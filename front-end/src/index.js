import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import "typeface-roboto"
// Layout
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      light: "#819ca9",
      main: "#546e7a",
      dark: "#29434e",
      contrastText: "#000"
    },
    secondary: {
      light: "#ffa4a2",
      main: "#e57373",
      dark: "#af4448",
      contrastText: "#000"
    },
    background: {
      login: "#546e7a" //primary.main
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
