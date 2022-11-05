import { AppliedUserType, ApplyFormType } from "./../types/apply";
import { UpdateValidationType } from "./../types/validation";
import {
  DeleteTodoType,
  NewToDoType,
  ToDoType,
  UpdateTodoType,
} from "./../types/todo";
import { NewClubType } from "./../types/club";
import {
  DeleteNoticetype,
  NewNoticeTagType,
  NewNoticeType,
  UpdateNoticeType,
} from "./../types/notice";
import { NewUserType } from "./../types/user";
import axios from "axios";

axios.defaults.withCredentials = true;

// const BASE_URL = "http://54.180.91.71:8000";
const BASE_URL = "http://localhost:8000";

const GET_ALL_CLUBS_URL = `${BASE_URL}/clubs/clubs`;

export const getAllClubs = async () =>
  axios.get(GET_ALL_CLUBS_URL).then((res) => res.data.data);

export const createClub = async (newClub: NewClubType) =>
  axios.post(GET_ALL_CLUBS_URL, newClub).then((res) => res.data);

const LOGIN_URL = `${BASE_URL}/auth/login`;

export const loginFromServer = async (userID: string, password: string) =>
  axios
    .post(LOGIN_URL, { userID, password }, { withCredentials: true })
    .then((res) => res.data);

const LOGOUT_URL = `${BASE_URL}/auth/logout`;

export const logoutFromServer = async () =>
  axios.post(LOGOUT_URL, {}).then((res) => res.data);

const VERIFY_URL = `${BASE_URL}/auth/verify`;

export const verifyUser = async () =>
  axios.post(VERIFY_URL, {}).then((res) => res.data.data);

const GET_ALL_NOTICES_URL = `${BASE_URL}/notices/notices`;

export const getAllNotices = async () =>
  axios.get(GET_ALL_NOTICES_URL).then((res) => res.data.data);

export const getNoticesByClubID = async (clubID: string) =>
  axios
    .get(GET_ALL_NOTICES_URL.concat("/club/", clubID))
    .then((res) => res.data.data);

export const createNotice = async (newNotice: NewNoticeType) =>
  axios.post(GET_ALL_NOTICES_URL, newNotice).then((res) => res.data);

export const deleteNotice = async (deleteNoticeInfo: DeleteNoticetype) =>
  axios
    .delete(GET_ALL_NOTICES_URL.concat("/", deleteNoticeInfo._id), {
      data: { clubId: deleteNoticeInfo.clubID },
    })
    .then((res) => res.data);

export const updateNotice = async (newNotice: UpdateNoticeType) =>
  axios
    .patch(GET_ALL_NOTICES_URL.concat("/", newNotice.noticeID), newNotice)
    .then((res) => res.data);

const GET_ALL_NOTICE_TAGS_URL = `${BASE_URL}/notices/noticeTags`;

export const createNoticeTag = async (newNoticeTag: NewNoticeTagType) =>
  axios.post(GET_ALL_NOTICE_TAGS_URL, newNoticeTag).then((res) => res.data);

export const getNoticeTagsByClubID = async (clubID: string) =>
  axios
    .get(GET_ALL_NOTICE_TAGS_URL.concat("/", clubID))
    .then((res) => res.data.data)
    .catch((error) => console.log(error));

export const deleteNoticeTag = async (deleteNoticeTagInfo: DeleteNoticetype) =>
  axios
    .delete(GET_ALL_NOTICE_TAGS_URL.concat("/", deleteNoticeTagInfo._id), {
      data: { clubId: deleteNoticeTagInfo.clubID },
    })
    .then((res) => res.data);
const GET_ONE_USER_URL = `${BASE_URL}/users/`;

export const getOneUser = async (userID: string) =>
  axios.get(GET_ONE_USER_URL.concat(userID)).then((res) => res.data.data);

const GET_ONE_CLUB_URL = `${BASE_URL}/clubs/clubs/`;

export const getOneClub = async (clubID: string) =>
  axios.get(GET_ONE_CLUB_URL.concat(clubID)).then((res) => res.data.data);

const GET_CLUB_MEMBERS_URL = `${BASE_URL}/users/byClub/`;

export const getClubMembers = async (clubID: string) =>
  axios.get(GET_CLUB_MEMBERS_URL.concat(clubID)).then((res) => res.data.data);

const CREATE_USER_URL = `${BASE_URL}/users`;

export const createUser = async (userInfo: NewUserType) => {
  axios.post(CREATE_USER_URL, userInfo).then((res) => res.data);
};

const GET_VALIDATON_BY_CLUBID_URL = `${BASE_URL}/validations/`;

export const getValidatonByClubID = async (clubID: string) =>
  axios
    .get(GET_VALIDATON_BY_CLUBID_URL.concat(clubID))
    .then((res) => res.data.data);

export const updateValidation = async (
  clubID: string,
  validationInfo: UpdateValidationType
) =>
  axios
    .patch(GET_VALIDATON_BY_CLUBID_URL.concat(clubID), validationInfo)
    .then((res) => res.data);

const GET_ALL_TODOS_URL = `${BASE_URL}/todos/ToDos`;

export const getTodosByClubID = async (clubID: string) =>
  axios
    .get(GET_ALL_TODOS_URL.concat("/club/", clubID))
    .then((res) => res.data.data);

export const createTodo = async (newTodo: NewToDoType) =>
  axios.post(GET_ALL_TODOS_URL, newTodo).then((res) => res.data.data);

export const deleteTodo = async (deleteTodoInfo: DeleteTodoType) =>
  axios
    .delete(GET_ALL_TODOS_URL.concat("/", deleteTodoInfo._id), {
      data: { clubId: deleteTodoInfo.clubId },
    })
    .then((res) => res.data);

export const updateTodo = async (todoInfo: UpdateTodoType) =>
  axios
    .patch(GET_ALL_TODOS_URL.concat("/", todoInfo._id), todoInfo)
    .then((res) => res.data);

const GET_ALL_TODO_TAGS_URL = `${BASE_URL}/todos/toDoTags`;

export const getTodoTagsByClubID = async (clubID: string) =>
  axios
    .get(GET_ALL_TODO_TAGS_URL.concat("/club/", clubID))
    .then((res) => res.data.data);

export const createTodoTag = async (newTag: NewNoticeTagType) =>
  axios.post(GET_ALL_TODO_TAGS_URL, newTag).then((res) => res.data);

export const deleteTodoTag = async (tagInfo: DeleteTodoType) =>
  axios
    .delete(GET_ALL_TODO_TAGS_URL.concat("/", tagInfo._id), {
      data: {
        clubId: tagInfo.clubId,
      },
    })
    .then((res) => res.data);

const GET_ALL_APPLIERS_URL = `${BASE_URL}/applies/appliers`;

export const getApplierByClubID = (clubID: string) =>
  axios
    .get(GET_ALL_APPLIERS_URL.concat("/byClub/", clubID))
    .then((res) => res.data.data);

const Get_ALL_APPLIED_USERS = `${BASE_URL}/applies/appliedUsers`;

export const createAppliedUser = (applierInfo: ApplyFormType) =>
  axios.post(Get_ALL_APPLIED_USERS, applierInfo).then((res) => res.data);
