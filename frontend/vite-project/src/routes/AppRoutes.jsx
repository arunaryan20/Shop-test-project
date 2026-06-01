import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { Toaster } from "react-hot-toast";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes=()=> {
  return (
   <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<ProtectedRoutes> <MainLayout /></ProtectedRoutes>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;