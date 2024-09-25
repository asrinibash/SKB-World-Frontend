import { useRecoilState } from "recoil";
import { userAuthState } from "./UserAuthState";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { server } from "../../main";

export const useUserAuthentication = () => {
  const [authState, setAuthState] = useRecoilState(userAuthState);

  const loginAdmin = async (email, password) => {
    setAuthState((prevState) => ({
      ...prevState,
    }));

    try {
      const response = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        }
      );

      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        token: response.data.token,
      }));

      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("userAuthState", response.data.token);
      localStorage.setItem("tokenExpirationUser", expirationTime);

      console.log("Login Successfully");
      return true;
    } catch (error) {
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: false,
        token: null,
        user: null,
      }));
      console.log("Login Failed");
      return false;
    }
  };

  const validateTokenOfUser = () => {
    const token = localStorage.getItem("userAuthState");
    const expirationTime = localStorage.getItem("tokenExpirationUser");

    if (!token || !expirationTime) {
      return false;
    }

    const currentTime = new Date().getTime();
    if (currentTime > expirationTime) {
      logout();
      return false;
    }

    return true;
  };

  const logout = () => {
    localStorage.removeItem("userAuthState");
    localStorage.removeItem("tokenExpirationUser");
    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated: false,
      token: null,
      user: null,
    }));
  };

  return { loginAdmin, logout, validateTokenOfUser };
};
