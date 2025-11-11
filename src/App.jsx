import React from "react";
import { Routes, Route } from "react-router-dom";
import DataView from "./pages/dashboard/DataView";
import Home from "./pages/home/Home";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DataView />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  );
}

export default App;