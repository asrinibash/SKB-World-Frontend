import { useSetRecoilState } from "recoil";
import { userAuthState } from "./UserAuthState";
import { jwtDecode } from "jwt-decode";

export const useUserAuth = () => {
  const setAuth = useSetRecoilState(userAuthState);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now();

    if (!isExpired) {
      localStorage.setItem("userAuthState", token);
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
    localStorage.removeItem("userAuthState");
    setAuth({
      token: null,
      isAuthenticated: null,
      user: null,
    });
  };

  const validateTokenOfUser = () => {
    const token = localStorage.getItem("userAuthState");

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
  return { login, logout, validateTokenOfUser };
};
