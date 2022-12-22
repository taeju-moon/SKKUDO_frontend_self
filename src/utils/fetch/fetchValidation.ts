import axios from "axios";
import { UpdateValidationType } from "../../types/validation";
import { BASE_URL } from "./fetch";

const GET_VALIDATON_BY_CLUBID_URL = `${BASE_URL}/validations/`;

export const getValidatonByClubID = async (clubID: string) =>
  axios
    .get(GET_VALIDATON_BY_CLUBID_URL.concat(clubID))
    .then((res) => res.data.data)
    .catch((error) => error.error);

export const updateValidation = async (
  clubID: string,
  validationInfo: UpdateValidationType
) =>
  axios
    .patch(GET_VALIDATON_BY_CLUBID_URL.concat(clubID), validationInfo)
    .then((res) => res.data);
