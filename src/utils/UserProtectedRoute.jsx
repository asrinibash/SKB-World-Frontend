import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../Recoil/User/UserAuthState";

const UserProtectedRoute = () => {
  const authState = useRecoilValue(userAuthState);
  return authState?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/user/login" />
  );
};

export default UserProtectedRoute;
