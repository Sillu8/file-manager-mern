import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#081A51",
      dark: "#051238",
      light: "#1B2B65",
      contrastText: "#fff",
    },
    secondary: {
      main: "#017EFA",
      light: "#51CBFF",
      dark: "#0058af",
      contrastText: "#6F7482",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export default theme;
