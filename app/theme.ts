import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00C896",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), system-ui, sans-serif",

    h1: { fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 },
    h2: { fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.015em" },
    h5: { fontWeight: 600, letterSpacing: "-0.01em" },
    h6: { fontWeight: 600, letterSpacing: "-0.005em" },

    body1: { fontWeight: 300, lineHeight: 1.75 },
    body2: { fontWeight: 300, lineHeight: 1.7 },

    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
});

export default theme;
