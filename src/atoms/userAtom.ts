import { UserApplierType } from "./../types/user";
import { atom } from "recoil";
import { UserType } from "../types/user";

export const userIDState = atom({
  key: "userIDState",
  default: "",
});

export const userNameState = atom({
  key: "userNameState",
  default: "",
});

export const userInfoState = atom<UserApplierType>({
  key: "userInfoState",
  default: { studentId: "", name: "", major: "", userId: "", contact: "" },
});

export const loggedInUserState = atom<UserType | null>({
  key: "loggedInUser",
  default: null,
});
