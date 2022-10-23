import axios from "axios";

const BASE_URL = "http://54.180.91.71:8000";

const GET_ALL_CLUBS_URL = `${BASE_URL}/clubs/clubs`;

export const getAllClubs = async () =>
  axios.get(GET_ALL_CLUBS_URL).then((res) => res.data.data);

const LOGIN_URL = `${BASE_URL}/auth/login`;

export const loginFromServer = async (userID: string, password: string) =>
  axios.post(LOGIN_URL, { userID, password }).then((res) => res.data);

const VERIFY_URL = `${BASE_URL}/auth/verify`;

export const verifyUser = async () => {
  axios.post(VERIFY_URL, {}).then((res) => res.data);
};

const GET_ALL_NOTICES_URL = `${BASE_URL}/notices/notices`;

export const getAllNotices = async () =>
  axios.get(GET_ALL_NOTICES_URL).then((res) => res.data.data);

const GET_ONE_USER_URL = `${BASE_URL}/users/`;

export const getOneUser = async (userID: string) =>
  axios.get(GET_ONE_USER_URL.concat(userID)).then((res) => res.data.data);

const GET_ONE_CLUB_URL = `${BASE_URL}/clubs/clubs/`;

export const getOneClub = async (clubID: string) =>
  axios.get(GET_ONE_CLUB_URL.concat(clubID)).then((res) => res.data.data);

const GET_CLUB_MEMBERS_URL = `${BASE_URL}/users/byClub/`;

export const getClubMembers = async (clubID: string) =>
  axios.get(GET_CLUB_MEMBERS_URL.concat(clubID)).then((res) => res.data.data);
