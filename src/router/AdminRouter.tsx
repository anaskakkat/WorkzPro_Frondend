// import React from 'react'

import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import AdminLogin from "../pages/Admin/AdminLogin";
import PublicRouteAdmin from "../components/protectedRoute.tsx/admin/PublicRouteAdmin";
import ProtectedRouteAdmin from "../components/protectedRoute.tsx/admin/ProtectedRouteAdmin";

const AdminRouter = () => {
  return (
    <Routes>
      {/* Public routes */}

      <Route element={<PublicRouteAdmin />}>
        <Route path="/login" element={<AdminLogin />} />
      </Route>
      {/* Protected routes */}
      <Route element={<ProtectedRouteAdmin />}>
        <Route path="/" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
