import { User } from "./user";

export interface ToDoTag {
  _id: string;
  clubId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ToDo {
  _id: string;
  clubId: string;
  writer: User;
  title: string;
  content: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  attendingUsers: string[]; //유저들의 studentId의 배열
  tags: ToDoTag[];
  createdAt: Date;
  updatedAt: Date;
}
