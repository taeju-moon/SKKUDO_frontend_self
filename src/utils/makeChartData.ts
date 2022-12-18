import { ToDoType } from "./../types/todo";
import moment from "moment";
import { UserType } from "../types/user";
export function makeChartData(key: string, value: string[]) {
  const names = Array.from(new Set(value));
  const obj: { [key: string]: number } = {};
  names.forEach((name) => {
    obj[name] = value.filter((x) => x === name).length;
  });

  if (obj[""]) {
    obj["응답 없음"] = obj[""];
    delete obj[""];
  }
  return obj;
}

export const calculateTodayTodos = (todos: ToDoType[]) => {
  const today = moment(new Date()).format("YYYY-MM-DD");
  const result = todos.filter(
    (todo) => moment(todo.date).format("YYYY-MM-DD") === today
  );

  return result.length;
};

export const calculateMonthTodos = (todos: ToDoType[]) => {
  const today = moment(new Date()).format("YYYY-MM-DD");
  const thisMonth = moment(new Date()).format("YYYY-MM");
  const result = todos.filter(
    (todo) =>
      moment(todo.date).format("YYYY-MM") === thisMonth &&
      moment(todo.date).format("YYYY-MM-DD") >= today
  );

  return result.length;
};

export const studentIDExample = (members: UserType[]) => {
  const result = members.map((member) => member.studentId.slice(2, 4));
  return Array.from(new Set(result)).sort();
};

export const studentIDData = (members: UserType[]) => {
  const result = new Map(studentIDExample(members).map((ele) => [ele, 0]));
  members.forEach((member) => {
    const id = member.studentId.slice(2, 4);

    const prev = result.get(id);
    if (typeof prev === "undefined") {
      result.set(id, 0);
    } else {
      result.set(id, prev + 1);
    }
  });

  return Array.from(result.values());
};

export const studentMajorData = (members: UserType[]) => {
  const result = new Map<string, number>();
  members.forEach((member) => {
    if (result.get(member.major)) {
      result.set(member.major, result.get(member.major)! + 1);
    } else {
      result.set(member.major, 1);
    }
  });

  const realResult: { label: string; value: number }[] = [];
  result.forEach((value, key) => realResult.push({ label: key, value }));
  return realResult;
};
