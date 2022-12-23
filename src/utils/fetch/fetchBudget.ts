import axios from "axios";
import { NewBudgetRowType, NewBudgetType } from "../../types/budget";
import { BASE_URL } from "./fetch";

const GET_ALL_BUDGETS_URL = `${BASE_URL}/budgets/budgets`;

export const createBudget = async (budgetInfo: NewBudgetType) =>
  axios.post(GET_ALL_BUDGETS_URL, budgetInfo).then((res) => res.data);

export const getBudgetsByClubID = (clubID: string) =>
  axios
    .get(GET_ALL_BUDGETS_URL.concat("/club/", clubID))
    .then((res) => res.data.data);

export const deleteBudget = (budgetID: string, clubId: string) =>
  axios
    .delete(GET_ALL_BUDGETS_URL.concat("/", budgetID), { data: { clubId } })
    .then((res) => res.data);

export const updateBudgetRow = (
  rowIndex: number,
  budgetID: string,
  budgetRowInfo: NewBudgetRowType
) =>
  axios
    .patch(`${GET_ALL_BUDGETS_URL}/row/${rowIndex}/${budgetID}`, budgetRowInfo)
    .then((res) => res.data);

export const deleteBudgetRow = async (
  rowIndex: number,
  budgetID: string,
  clubId: string
) =>
  axios
    .delete(`${GET_ALL_BUDGETS_URL}/row/${rowIndex}/${budgetID}`, {
      data: { clubId },
    })
    .then((res) => res.data);
