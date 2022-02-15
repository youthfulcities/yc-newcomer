import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import Info from "./pages/Info";
import Home from "./pages/Home.js";
import ExploreAll from "./pages/ExploreAll";
import Intro from "./pages/Intro";
import Footer from "./components/Footer";
import CityTemplate from "./pages/CityTemplate.js";
import SuggestedCities from "./pages/SuggestedCities";

const theme = createTheme({
  palette: {
    primary: {
      dark: "#3f518c",
      main: "#4F66AF",
      light: "#8493c7",
    },
    secondary: {
      light: "#fcdf94",
      main: "#FBD166",
      dark: "#c9a752",
    },
    error: {
      light: "#f38f8c",
      main: "#EE605B",
      dark: "#be4c49",
    },
    warning: {
      light: "#f9d0cd",
      main: "#F7BCB7",
      dark: "#c69692",
    },
    success: {
      light: "#cde4af",
      main: "#B8D98D",
      dark: "#93ae71",
    },
    info: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Gotham Narrow Book",
    h1: {
      fontFamily: "Gotham Narrow Black",
    },
    h2: {
      fontFamily: "Gotham Narrow Medium",
    },
    h3: {
      fontFamily: "Gotham Narrow Medium",
    },
    h4: {
      fontFamily: "Gotham Narrow Light",
    },
    h5: {
      fontFamily: "Gotham Narrow Medium",
    },
  },
  shape: {
    borderRadius: 35,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: "200px",
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingTop: 5,
          paddingRight: 0,
          paddingBottom: 0,
          background: "#F5F5F5",
          color: "#000",
          "&.Mui-expanded": {
            background: "#F7BCB7",
            color: "#000",
          },
        },
      },
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          background: "#F5F5F5",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: "inherit",
          borderBottomLeftRadius: "inherit",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          marginLeft: 10,
          marginTop: 10,
          marginRight: 10,
          marginBottom: 10,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          position: "absolute",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          position: "relative",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.75rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "#fff",
          fontFamily: "Gotham Narrow Book",
          fontSize: "1.75rem",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 35,
          border: "2px",
          borderStyle: "solid",
          borderColor: "rgb(79, 102, 175)",
          minHeight: 28,
          boxSizing: "border-box",
          position: "relative",
        },
        root: {
          "&.Mui-focused": {
            backgroundColor: "transparent",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

function App() {
  //because ODS controls the search params via angular we can't use react-router-dom to do so
  //instead we'll just keep track of the url statefully
  const [url, setUrl] = useState({
    full: window.location.href,
    query: window.location.search,
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/info/"
            element={<Info url={url} setUrl={setUrl} />}
          ></Route>
          <Route path="/intro" element={<Intro />}></Route>
          <Route path="/explore-all" element={<ExploreAll />}></Route>
          <Route path="/suggested-cities" element={<SuggestedCities />}></Route>
          <Route path="/about/:cityname" element={<CityTemplate />}></Route>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
