import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { Outlet } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState } from "../atoms/loginAtom";
import {
  loggedInUserState,
  userInfoState,
  userNameState,
} from "../atoms/userAtom";
import { VerifyUserResponseType } from "../types/user";
import { verifyUser } from "../utils/fetch/fetchAuth";

export default function PublicRoute() {
  const [cookies, setCookies, removeCoolies] = useCookies(["x_auth"]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const setUserName = useSetRecoilState(userNameState);
  const setUserInfoState = useSetRecoilState(userInfoState);
  const setLoggedInUser = useSetRecoilState(loggedInUserState);
  const { mutate } = useMutation<VerifyUserResponseType>(verifyUser, {
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setUserName(data.authUser.name);
      setUserInfoState({
        userId: data.authUser.userID,
        studentId: data.authUser.studentId,
        name: data.authUser.name,
        major: data.authUser.major,
        contact: data.authUser.contact,
      });
      setLoggedInUser(data.authUser);
      console.log("mutate executed");
      // console.log(data);
    },
    onError: (error: any) => {
      setIsLoggedIn(false);
      setUserName("");
      setUserInfoState({
        userId: "",
        studentId: "",
        name: "",
        major: "",
        contact: "",
      });
      console.log("mutate executed");
    },
  });

  useEffect(() => {
    if (cookies["x_auth"]) {
      mutate();
    }
  }, []);
  return <Outlet />;
}
