import { atom } from "recoil";

export const adminAuthState = atom({
  key: "adminAuthState",
  default: {
    isAuthenticated: localStorage.getItem("adminAuthToken") ? true : false,
    token: localStorage.getItem("adminAuthToken")
      ? localStorage.getItem("adminAuthToken")
      : null,
    user: null,
  },
});
