import React, { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Writings from "./components/Writings";
import SearchBar from "./components/SearchBar";
import Drawer from "./components/Drawer";
import LoginPage from "./components/LoginPage";
import AddThreadButton from "./components/AddThreadButton";
import { Box } from "@mui/material";
import backgroundpicture from "./assets/CVWObackground.jpg";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(${backgroundpicture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Drawer />
        <Box style={{ flexGrow: 1, textAlign: "center" }} sx={{ mr: 11 }}>
          <SearchBar />
        </Box>
        <Box sx={{ mt: 9, mr: 3 }}>
          <AddThreadButton />
        </Box>
      </div>
      <div style={{ marginTop: "10px" }}>{children}</div>
      <Outlet />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Writings />
            </MainLayout>
          }
        />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
