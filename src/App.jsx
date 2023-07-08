import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import { ThemeProvider, createTheme } from "@mui/material";
import { teal, yellow } from "@mui/material/colors";
import Navbar from "./components/Navbar";
import Auth from "./components/authentication/Auth";
import { UserContext } from "./contexts/UserContext";
import UpdateProfile from "./components/authentication/UpdateProfile";
import Footer from "./components/Footer";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: yellow,
    },
    typography: {
      allVariants: {
        fontFamily: "Spectral",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Routes>
          <Footer />
        </UserContext>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
