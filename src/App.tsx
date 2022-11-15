import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Path from "./utils/routes/Path";
import HomePage from "./components/home/HomePage";
import RockPaperScissors from "./components/rps/RockPaperScissors";

function App() {
  const { HOME, RPS } = Path;

  return (
    <div>
      <Routes>
        <Route path={HOME} element={<HomePage />} />
        <Route path={RPS} element={<RockPaperScissors />} />
      </Routes>
    </div>
  );
}

export default App;
