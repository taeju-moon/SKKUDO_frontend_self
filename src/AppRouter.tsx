import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import AboutPage from "./pages/AboutPage";
import CalendarPage from "./pages/CalendarPage";
import ClubDetailPage from "./pages/ClubDetailPage";
import ClubManagePage from "./pages/managePages/ClubManagePage";
import ClubsPage from "./pages/ClubsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManageRecruit from "./pages/managePages/ManageRecruit";
import ManageUser from "./pages/managePages/ManageUser";
import MembersPage from "./pages/MembersPage";
import MyPage from "./pages/MyPage";
import NoticePage from "./pages/NoticePage";
import Page404 from "./pages/Page404";
import SignupPage from "./pages/SignupPage";
import ManageAuth from "./pages/managePages/ManageAuth";
import ManageNotes from "./pages/managePages/ManageNotes";
import DashboardApp from "./pages/managePages/DashboardApp";
import ApplyClubPage from "./pages/ApplyClubPage";
import AddNoticePage from "./pages/AddNoticePage";
import { useMutation } from "react-query";
import { verifyUser } from "./utils/fetch";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState } from "./atoms/loginAtom";
import { useEffect } from "react";
import { VerifyUserResponseType } from "./types/user";
import {
  loggedInUserState,
  userInfoState,
  userNameState,
} from "./atoms/userAtom";
import UpdateNoticePage from "./pages/UpdateNoticePage";
import ApplyPage from "./pages/ApplyPage";
import ManageClub from "./pages/managePages/ManageClub";
import ProfilePage from "./pages/ProfilePage";
import ManageAccountBook from "./pages/managePages/ManageAccountBook";
import AboutMainPage from "./pages/AboutMainPage";
import AboutApplyPage from "./pages/AboutApplyPage";
import AboutClubManagePage from "./pages/AboutClubManagePage";
import AboutMakeClubPage from "./pages/AboutMakeClubPage";
import AboutMyPage from "./pages/AboutMyPage";

function AppRouter() {
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
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/about" element={<AboutPage />}>
          <Route path="main" element={<AboutMainPage />} />
          <Route path="apply" element={<AboutApplyPage />} />
          <Route path="makeclub" element={<AboutMakeClubPage />} />
          <Route path="mypage" element={<AboutMyPage />} />
          <Route path="manage" element={<AboutClubManagePage />} />
        </Route>
        <Route
          path="/myPage"
          element={isLoggedIn ? <MyPage /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate replace to="/" /> : <LoginPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/applyClub"
          element={
            isLoggedIn ? <ApplyClubPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/apply/:clubID"
          element={
            isLoggedIn ? <ApplyPage /> : <Navigate replace to="/login" />
          }
        />

        <Route path="/club/:clubID" element={<ClubDetailPage />}>
          <Route path="notice" element={<NoticePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="notice/add" element={<AddNoticePage />} />
          <Route path="notice/:noticeID" element={<UpdateNoticePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/manage/:clubID" element={<ClubManagePage />}>
          <Route path="main" element={<DashboardApp />} />
          <Route path="user" element={<ManageUser />} />
          <Route path="recruit" element={<ManageRecruit />} />
          <Route path="auth" element={<ManageAuth />} />
          <Route path="notes" element={<ManageNotes />} />
          <Route path="club" element={<ManageClub />} />
          <Route path="accountBook" element={<ManageAccountBook />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
