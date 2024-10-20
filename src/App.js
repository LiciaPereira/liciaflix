import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  const user = null;

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
