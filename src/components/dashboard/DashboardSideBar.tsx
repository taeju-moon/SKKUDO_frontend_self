import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import Scrollbar from "./Scrollbar";
import NavSection from "./NavSection";
import navConfig from "../../config/NavConfig";

import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../atoms/userAtom";

import { ColumnType, RoleType } from "../../types/common";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500],
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
export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
}: IDashboardSidebar) {
  const account = {
    displayName: "Jaydon Frankie",
    email: "demo@minimals.cc",
    photoURL: "/static/mock-images/avatars/avatar_default.jpg",
  };

  // const { pathname } = useLocation();
  const { clubID } = useParams();

  const isDesktop = useResponsive("up", "lg");

  const loggedInUser = useRecoilValue(loggedInUserState);
  const [specificInfo, setSpecificInfo] = useState<{
    role: RoleType;
    moreColumns: {
      column: ColumnType;
      value: String;
    }[];
  }>();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    if (loggedInUser) {
      const registedClubs = new Map(
        Object.entries(loggedInUser.registeredClubs)
      );
      setSpecificInfo({
        role: registedClubs.get(clubID || "").role,
        moreColumns: registedClubs.get(clubID || "").moreColumns,
      });
    }
  }, [loggedInUser]);

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

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link
          underline="none"
          component={RouterLink}
          to={`/club/${clubID}/profile`}
        >
          <AccountStyle>
            <Avatar src={account.photoURL} alt="" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" sx={{ color: "text.primary" }}>
                {loggedInUser?.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#0c4426" }}>
                {specificInfo?.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

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
              borderRight: "1px solid yellow",
              color: "#dde143",
              boxShadow: "-3px 0px 0px 0px #dde143 inset",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
