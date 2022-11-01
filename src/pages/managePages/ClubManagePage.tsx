import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isManageState } from "../../atoms/NavigatorAtom";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import DashboardNavBar from "../../components/dashboardComponents/DashboardNavBar";
import DashboardSidebar from "../../components/dashboardComponents/DashboardSideBar";
//
// import DashboardSidebar from './DashboardSidebar';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function ClubManagePage() {
  const [open, setOpen] = useState(false);
  const setIsManage = useSetRecoilState(isManageState);

  useEffect(() => {
    setIsManage(true);
  }, []);

  return (
    <RootStyle>
      <DashboardNavBar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
export default ClubManagePage;