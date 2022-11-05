import { ColumnType } from "./common";

export interface ApplierType {
  _id: string;
  clubId: string;
  documentQuestions: string[]; //서류 질문
  interviewQuestions: string[]; //면접 질문
  appliedUserColumns: ColumnType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppliedUserType {
  _id: string;
  clubId: string;
  studentId: string;
  name: string;
  major: string;
  moreColumns: {
    column: ColumnType;
    value: string;
  }[];
  documentAnswers: string[]; //서류 답변
  documentScores: number[]; //서류 점수
  interviewAnswers: string[]; //면접 답변
  interviewScores: number[]; //면접 점수
  pass?: boolean; //합불여부
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApplyFormType {
  clubId: string;
  studentId: string;
  name: string;
  major: string;
  moreColumns: {
    column: ColumnType;
    value: String;
  }[];
  documentAnswers: string[]; //서류 답변
  documentScores: number[]; //서류 점수
  interviewScores: number[]; //면접 점수
}
