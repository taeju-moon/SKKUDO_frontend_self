import axios from "axios";

const GET_ALL_CLUBS_URL = "http://54.180.91.71:8000/clubs/clubs";
// export const getAllClubs = async () => {
//   const { data } = await axios.get(GET_ALL_CLUBS_URL);
//   return data;
// };
export const getAllClubs = async () =>
  axios.get(GET_ALL_CLUBS_URL).then((res) => res.data.data);
