import { RoleType, LocationType, ColumnType } from "./common";

export interface RegisteredClubType {
  clubId: string;
  clubName: string;
  role: RoleType;
  moreColumns: {
    column: ColumnType;
    value: String;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NewUserType {
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
  studentId: string;
  password: string;
  location: LocationType;
  registeredClubs: RegisteredClubs;
  name: string;
  major: string;
  token: string;
  tokenExp: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserApplierType {
  studentId: string;
  name: string;
  major: string;
}

export interface VerifyUserResponseType {
  authToken: string;
  authUser: UserType;
}
