import { LocationType, ColumnType } from "./common";

export type RecruitType = "정규모집" | "상시모집";

export interface ClubType {
  _id: string;
  name: string;
  location: LocationType;
  type: ClubTypeType;
  userColumns: ColumnType[];
  //description
  recruitType: RecruitType;
  recruitStart: Date | null; //모집 시작일
  recruitEnd: Date | null; //모집 종료일
  createdAt: Date;
  updatedAt: Date;
}

export interface ClubTypeType {
  _id: string;
  name: string; //프로그래밍, 경영
  createdAt: Date;
  updatedAt: Date;
}
