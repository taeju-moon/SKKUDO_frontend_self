import { UpdateTodoType } from "./../types/todo";
import { atom } from "recoil";
import { ToDoType } from "../types/todo";

export const dayDetailState = atom<ToDoType[]>({
  key: "dayDetailState",
  default: [],
});

export const isTodoUpdateState = atom({
  key: "isTodoUpdateState",
  default: false,
});

export const updateTodoInfoState = atom<UpdateTodoType>({
  key: "updateTodoInfoState",
  default: {
    _id: "",
    clubId: "",
    title: "",
    content: "",
    date: "",
    startTime: "",
    endTime: "",
    attendingUsers: [],
    tags: [],
  },
});
