import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import AboutPage from "./pages/AboutPage";
import CalendarPage from "./pages/CalendarPage";
import ClubDetailPage from "./pages/ClubDetailPage";
import ClubManagePage from "./pages/managePages/ClubManagePage";
import ClubsPage from "./pages/ClubsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManageMain from "./pages/managePages/ManageMain";
import ManageRecruit from "./pages/managePages/ManageRecruit";
import ManageUser from "./pages/managePages/ManageUser";

import MembersPage from "./pages/MembersPage";
import MyPage from "./pages/MyPage";
import NoticePage from "./pages/NoticePage";
import Page404 from "./pages/Page404";
import SignupPage from "./pages/SignupPage";
import ManageAuth from "./pages/managePages/ManageAuth";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/club/:clubID" element={<ClubDetailPage />}>
          <Route path="notice" element={<NoticePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="members" element={<MembersPage />} />
        </Route>
        <Route path="/manage/:clubID" element={<ClubManagePage />}>
          <Route path="main" element={<ManageMain />} />
          <Route path="user" element={<ManageUser />} />
          <Route path="recruit" element={<ManageRecruit />} />
          <Route path="auth" element={<ManageAuth />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
