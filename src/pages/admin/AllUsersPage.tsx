import { useQuery } from "react-query";
import styled from "styled-components";
import { getAllUsers } from "../../utils/fetch/fetchUser";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";
import { UserType } from "../../types/user";
import { PageTitle } from "../../components/admin/PageTitle";
import { useState } from "react";
import UserInfoDialog from "../../components/admin/UserInfoDialog";
import AllUsersTable from "../../components/admin/AllUsersTable";

export default function AllUsersPage() {
  const [open, setOpen] = useState(false);
  const [clickedUser, setClickedUser] = useState<UserType>();

  const handleUserItemClick = (user: UserType) => {
    setOpen(true);
    setClickedUser(user);
  };

  const { data } = useQuery<UserType[]>("getAllUsers", getAllUsers, {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
  return (
    <>
      <PageTitle>전체 유저</PageTitle>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1024,
          bgcolor: "background.paper",
          margin: "0 auto",
        }}
      >
        <List>
          <AllUsersTable isManage={true} />
        </List>
      </Box>
      <UserInfoDialog open={open} setOpen={setOpen} clickedUser={clickedUser} />
    </>
  );
}
