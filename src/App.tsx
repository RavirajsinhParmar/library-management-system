import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import "./App.css";

function App() {
  return (
    <div className="App min-h-screen justify-center items-center">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
