import { useSetRecoilState } from "recoil";
import { adminAuthState } from "./AdminAuthState";
import { jwtDecode } from "jwt-decode";

export const useAdminAuth = () => {
  const setAuth = useSetRecoilState(adminAuthState);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now();

    if (!isExpired) {
      localStorage.setItem("adminAuthState", token);
      setAuth({
        token,
        isAuthenticated: true,
        user: decodedToken.user,
      });
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("adminAuthState");
    setAuth({
      token: null,
      isAuthenticated: null,
      user: null,
    });
  };

  const validateToken = () => {
    const token = localStorage.getItem("adminAuthState");

    if (token) {
      const decodedToken = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();

      if (!isExpired) {
        setAuth({
          token,
          isAuthenticated: true,
          user: decodedToken.user,
        });
      } else {
        logout();
      }
    }
  };
  return { login, logout, validateToken };
};
