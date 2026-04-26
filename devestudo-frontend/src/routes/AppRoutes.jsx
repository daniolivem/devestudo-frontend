import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Forum from "../pages/forum/Forum";
import Groups from "../pages/groups/Groups";
import Mentors from "../pages/mentors/Mentors";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Register from "../pages/auth/Register";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}