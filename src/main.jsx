import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GridExample from "./gridExample.jsx";
import GetDatos from "./getDatos.jsx";
import Home from "./Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-datos" element={<GetDatos />} />
          <Route path="/grid-example" element={<GridExample />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);