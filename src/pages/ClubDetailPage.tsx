import { Outlet } from "react-router-dom";
import ClubDetailNavigator from "../components/ClubDetailNavigator";

function ClubDetailPage() {
  return (
    <>
      <ClubDetailNavigator />
      <Outlet />
    </>
  );
}

export default ClubDetailPage;
