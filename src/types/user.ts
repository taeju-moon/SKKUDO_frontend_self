import { RoleType, LocationType, ColumnType } from "./common";

export interface RegisteredClubType {
  clubId: string;
  clubName: string;
  role: RoleType;
  image: string;
  moreColumns: {
    column: ColumnType;
    value: String;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NewUserType {
  contact: string;
  name: string;
  studentId: string;
  userID: string;
  password: string;
  location: string;
  major: string;
}

export type RegisteredClubs = Map<string, RegisteredClubType>;

export interface UserType {
  _id: string;
  contact: string;
  studentId: string;
  password: string;
  location: LocationType;
  registeredClubs: RegisteredClubs;
  name: string;
  major: string;
  userID: string;
  token: string;
  tokenExp: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserApplierType {
  userId: string;
  studentId: string;
  name: string;
  major: string;
  contact: string;
}

export interface VerifyUserResponseType {
  authToken: string;
  authUser: UserType;
}

export interface RegisterInfoType {
  initialRole: RoleType;
  moreColumns: {
    column: ColumnType;
    value: String;
  }[];
}
