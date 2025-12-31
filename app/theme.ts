import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD400",
    },
  },
  typography: {
    fontFamily: "var(--font-space), system-ui, sans-serif",

    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },

    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },

    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.04em",
    },
  },
});

export default theme;
