/* eslint-disable no-unused-vars */
import { useRecoilState, useSetRecoilState } from "recoil";
import { adminAuthState } from "./AdminAuthState";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { server } from "../../main";

export const useAdminAuthentication = () => {
  const [authState, setAuthState] = useRecoilState(adminAuthState);

  const loginAdmin = async (email, password) => {
    setAuthState((prevState) => ({
      ...prevState,
    }));

    try {
      const response = await axios.post(`${server}/admin/login`, {
        email,
        password,
      });

      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        token: response.data.token,
      }));

      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("adminAuthToken", response.data.token);
      localStorage.setItem("tokenExpiration", expirationTime);

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

  const validateTokenOfAdmin = () => {
    const token = localStorage.getItem("adminAuthToken");
    const expirationTime = localStorage.getItem("tokenExpiration");

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
    localStorage.removeItem("adminAuthToken");
    localStorage.removeItem("tokenExpiration");
    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated: false,
      token: null,
      user: null,
    }));
  };

  return { loginAdmin, logout, validateTokenOfAdmin };
};
