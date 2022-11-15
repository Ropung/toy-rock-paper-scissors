import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/test" element={<div>Test</div>} />
      </Routes>
    </div>
  );
}

export default App;
