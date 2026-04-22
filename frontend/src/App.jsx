import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css"; // or "./App.css" if your styles are there

import CourseModules from "./Componenets/CourseModules/coursemoduels";
import AdminPanel from "./Componenets/CourseModules/AdminPanelModules";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<CourseModules />} />
          <Route path="/adminmodules" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
