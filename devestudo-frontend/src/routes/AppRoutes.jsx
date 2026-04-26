import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminLogin from "../pages/auth/AdminLogin";
import Dashboard from "../pages/dashboard/Dashboard";
import Forum from "../pages/forum/Forum";
import Groups from "../pages/groups/Groups";
import Mentors from "../pages/mentors/Mentors";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Register from "../pages/auth/Register";
import Profile from "../pages/profile/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
