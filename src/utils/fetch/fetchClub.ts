import axios from "axios";
import { NewClubType, UpdateClubInfoType } from "../../types/club";
import { ColumnType, NewColumnType } from "../../types/common";
import { BASE_URL } from "./fetch";

const GET_ALL_CLUB_TYPES_URL = `${BASE_URL}/clubs/clubTypes`;

export const getAllClubTypes = async () =>
  await axios.get(GET_ALL_CLUB_TYPES_URL).then((res) => res.data.data);

const GET_ALL_CLUBS_URL = `${BASE_URL}/clubs/clubs`;

export const getAllClubs = async () =>
  axios.get(GET_ALL_CLUBS_URL).then((res) => res.data.data);

export const createClub = async (newClub: NewClubType) =>
  axios.post(GET_ALL_CLUBS_URL, newClub).then((res) => res.data);

export const getNotAcceptedClubs = async () =>
  axios
    .get(GET_ALL_CLUBS_URL.concat("/notAccepted"))
    .then((res) => res.data.data);

export const uploadImage = async (clubId: string, formData: any) => {
  const result = await axios.post(
    GET_ALL_CLUBS_URL.concat("/upload/", clubId),
    formData
  );
  return result;
};

const GET_ONE_CLUB_URL = `${BASE_URL}/clubs/clubs/`;

export const getOneClub = async (clubID: string) =>
  axios.get(GET_ONE_CLUB_URL.concat(clubID)).then((res) => res.data.data);

export const updateClub = async (
  clubID: string,
  updateInfo: UpdateClubInfoType
) =>
  axios
    .patch(GET_ONE_CLUB_URL.concat(clubID), updateInfo)
    .then((res) => res.data);

export const accpetClub = async (clubID: string) =>
  axios
    .patch(GET_ONE_CLUB_URL.concat("accept", "/", clubID), {})
    .then((res) => res.data);

export const deleteClub = async (clubID: string) =>
  axios.delete(GET_ONE_CLUB_URL.concat("/", clubID)).then((res) => res.data);

const CLUB_COLUMNS_URL = `${BASE_URL}/clubs/clubs/userColumn`;

export const addClubUserColumn = async (
  clubId: string,
  userColumn: NewColumnType
) => {
  const result = await axios.post(CLUB_COLUMNS_URL.concat(`/${clubId}`), {
    userColumn,
  });
  return result;
};

export const updateClubUserColumn = async (
  clubId: string,
  key: string,
  newColumn: ColumnType
) => {
  const result = await axios.patch(CLUB_COLUMNS_URL.concat(`/${clubId}`), {
    key,
    newColumn,
  });
  return result;
};

export const deleteClubUserColumn = async (clubId: string, key: string) => {
  const result = await axios.delete(CLUB_COLUMNS_URL.concat(`/${clubId}`), {
    data: { key },
  });
  return result;
};
