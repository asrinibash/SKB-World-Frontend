import { atom } from "recoil";

export const userAuthState = atom({
  key: "userAuthState",
  default: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
});
