import { Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const navigationList = [
  { navigationTitle: "공지사항", navigationPath: "notice" },
  { navigationTitle: "동아리 일정", navigationPath: "calendar" },
  { navigationTitle: "동아리 멤버", navigationPath: "members" },
];

function ClubDetailPage() {
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => setState(open);

  const list = () => (
    <Box
      sx={{}}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <div>Club Name</div>
      <Divider />
      <List>
        {navigationList.map((navigationItem, index) => (
          <ListItem key={navigationItem.navigationTitle} disablePadding>
            <ListItemButton
              onClick={() => navigate(navigationItem.navigationPath)}
            >
              <ListItemText primary={navigationItem.navigationTitle} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div style={{ paddingTop: "80px" }}>Sidebar</div>
      <div>
        <React.Fragment>
          <Button onClick={() => toggleDrawer(true)}>real sidebar</Button>
          <Drawer open={state} onClose={() => toggleDrawer(false)}>
            {list()}
          </Drawer>
        </React.Fragment>
      </div>
      <Outlet />
    </>
  );
}

export default ClubDetailPage;
