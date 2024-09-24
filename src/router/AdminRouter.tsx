import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import AdminLogin from "../pages/Admin/AdminLogin";
import PublicRouteAdmin from "../components/protectedRoute.tsx/admin/PublicRouteAdmin";
import ProtectedRouteAdmin from "../components/protectedRoute.tsx/admin/ProtectedRouteAdmin";
import ErrorComponent from "../components/ErrorComponent";

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

          <Route path="*" element={<ErrorComponent />} />

        </Route>
      </Routes>
  );
};

export default AdminRouter;
