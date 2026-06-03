import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";

import { Toaster } from "react-hot-toast";

// Electron Production => HashRouter
// Vite Dev Server => BrowserRouter
const Router =
  window.location.protocol === "file:"
    ? HashRouter
    : BrowserRouter;

const AppRoutes = () => {
  return (
    <Router>
      <Toaster position="top-right" />

      <Routes>
        <Route
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;