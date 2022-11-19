import { ClubType } from "./../types/club";
import { atom } from "recoil";

export const isNoticeDetailOpenState = atom({
  key: "isNoticeDetailOpenState",
  default: false,
});

export const currentClubInfoState = atom<ClubType | null>({
  key: "currentClubInfo",
  default: null,
});
