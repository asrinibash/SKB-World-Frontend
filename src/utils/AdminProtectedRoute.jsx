import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminAuthState } from "../Recoil/Admin/AdminAuthState";

const AdminProtectedRoute = () => {
  const authState = useRecoilValue(adminAuthState);
  return authState?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/secure/login" />
  );
};

export default AdminProtectedRoute;
