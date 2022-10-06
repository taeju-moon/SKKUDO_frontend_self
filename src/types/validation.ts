import { RoleType } from "./common";

export interface ValidationType {
  _id: string;
  clubId: string;
  noticeRead: RoleType;
  noticeWrite: RoleType;
  userRead: RoleType;
  userWrite: RoleType;
  userColumnWrite: RoleType;
  todoRead: RoleType;
  todoWrite: RoleType;
  applyRead: RoleType;
  applyWrite: RoleType;
  validationRead: RoleType;
  validationWrite: "회장단";
  clubRead: RoleType;
  clubWrite: "회장단";
  createdAt: Date;
  updatedAt: Date;
}
