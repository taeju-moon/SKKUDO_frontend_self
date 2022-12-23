import axios from "axios";
import {
  ApplyFormType,
  NewApplierType,
  UpdateAppliedUserType,
  UpdateApplierType,
} from "../../types/apply";
import { BASE_URL } from "./fetch";

const GET_ALL_APPLIERS_URL = `${BASE_URL}/applies/appliers`;

export const getApplierByClubID = (clubID: string) =>
  axios
    .get(GET_ALL_APPLIERS_URL.concat("/byClub/", clubID))
    .then((res) => res.data.data);

export const updateApplier = (clubID: string, applierInfo: UpdateApplierType) =>
  axios
    .patch(GET_ALL_APPLIERS_URL.concat("/", clubID), applierInfo)
    .then((res) => res.data);

export const deleteApplier = (clubID: string) =>
  axios
    .delete(GET_ALL_APPLIERS_URL.concat("/", clubID))
    .then((res) => res.data);

export const createApplier = (newApplier: NewApplierType) =>
  axios.post(GET_ALL_APPLIERS_URL, newApplier).then((res) => res.data);

const Get_ALL_APPLIED_USERS = `${BASE_URL}/applies/appliedUsers`;

export const createAppliedUser = (applierInfo: ApplyFormType) =>
  axios.post(Get_ALL_APPLIED_USERS, applierInfo).then((res) => res.data);

export const getAppliedUserByClubID = (clubID: string) =>
  axios
    .get(Get_ALL_APPLIED_USERS.concat("/byClub/", clubID))
    .then((res) => res.data.data);

export const deleteAppliedUser = async (applyID: string, clubID: string) =>
  await axios
    .delete(Get_ALL_APPLIED_USERS.concat("/", applyID), {
      data: { clubId: clubID },
    })
    .then((res) => res.data);

export const deleteAppliedUsersByClubID = (clubID: string) =>
  axios
    .delete(GET_ALL_APPLIERS_URL.concat("/club/", clubID))
    .then((res) => res.data);

const GET_APPLIED_USERS_BY_ID = `${BASE_URL}/applies/appliedUsers/byUser`;

export const getAppliedUserByID = () =>
  axios.get(GET_APPLIED_USERS_BY_ID).then((res) => res.data.data);

export const updateAppliedUser = async (
  id: string,
  newInfo: UpdateAppliedUserType
) =>
  axios
    .patch(Get_ALL_APPLIED_USERS.concat("/", id), newInfo)
    .then((res) => res.data);
