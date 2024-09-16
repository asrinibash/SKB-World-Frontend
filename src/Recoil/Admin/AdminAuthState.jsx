import { atom } from "recoil";

export const adminAuthState = atom({
  key: "adminAuthState",
  default: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
});
