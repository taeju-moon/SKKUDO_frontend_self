import { atom } from "recoil";
export const isAuthConfirmAlertOpenState = atom({
  key: "isAuthConfirmAlertOpenState",
  default: false,
});

interface ClubUpdateType {
  keyword: string;
}
export const clubUpdateState = atom({
  key: "clubUpdateState",
  default: { keyword: "" },
});
