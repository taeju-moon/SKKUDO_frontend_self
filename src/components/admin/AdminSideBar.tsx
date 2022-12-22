import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Drawer } from "@mui/material";

import { useRecoilValue } from "recoil";
import useResponsive from "../../hooks/useResponsive";
import Scrollbar from "../dashboard/Scrollbar";
import NavSection from "../dashboard/NavSection";
import { loggedInUserState } from "../../atoms/userAtom";
import adminNavConfig from "./AdminNavConfig";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const Logo = styled(RouterLink)({
  color: "#dde143",
  textDecoration: "none",
  fontSize: "50px",
  fontWeight: 900,
  marginBottom: "30px",
});

interface IDashboardSidebar {
  isOpenSidebar: boolean;
  onCloseSidebar(): void;
}
export default function AdminSidebar({
  isOpenSidebar,
  onCloseSidebar,
}: IDashboardSidebar) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const loggedInUser = useRecoilValue(loggedInUserState);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname, loggedInUser]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo to="/">SKKUDO</Logo>
      </Box>

      <NavSection navConfig={adminNavConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "#0c4426",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "#0c4426",
              border: "none",
              color: "#dde143",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
