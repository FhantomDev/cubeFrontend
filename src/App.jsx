import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categoria from "./pages/categoria/Categoria";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria" element={<Categoria />} />
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