'use client';
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GridExample from "./gridExample.jsx";
import GetDatos from "./getDatos.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <GetDatos />
  </StrictMode>
);