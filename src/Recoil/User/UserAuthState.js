import { atom } from "recoil";

export const userAuthState = atom({
  key: "userAuthState",
  default: {
    isAuthenticated: localStorage.getItem("userAuthState") ? true : false,
    token: localStorage.getItem("userAuthState")
      ? localStorage.getItem("userAuthState")
      : null,
    user: null,
  },
});
