import { RoleType, LocationType, ColumnType } from "./common";

export interface RegisteredClub {
  _id: string;
  clubId: string;
  role: RoleType;
  moreColumns: {
    column: ColumnType;
    value: String;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  studentId: string;
  password: string;
  location: Location;
  registeredClubs: RegisteredClub[];
  name: string;
  major: string;
  createdAt: Date;
  updatedAt: Date;
}
