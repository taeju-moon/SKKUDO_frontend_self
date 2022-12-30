import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useQueryClient } from "react-query";
import { UserType } from "../../types/user";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useState } from "react";

interface UserInfoDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickedUser: UserType | undefined;
}

export default function UserInfoDialog({
  open,
  setOpen,
  clickedUser,
}: UserInfoDialogType) {
  const queryClient = useQueryClient();

  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">유저 세부 정보</DialogTitle>
      {clickedUser ? (
        <Card
          sx={{
            margin: "0 auto",

            width: "100%",
            maxWidth: "1024px",
          }}
        >
          <DialogContent sx={{ width: "512px" }}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton>
                <ListItemText primary={`유저 이름 : ${clickedUser.name}`} />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary={`학과 : ${clickedUser.major}`} />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary={`연락처 : ${clickedUser.contact}`} />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary={`아이디 : ${clickedUser.userID}`} />
              </ListItemButton>
              <ListItemButton onClick={handleClick}>
                <ListItemText primary="가입된 동아리" />
                {collapseOpen ? <MdExpandLess /> : <MdExpandMore />}
              </ListItemButton>
              <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {Object.values(clickedUser.registeredClubs).map((club) => (
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText
                        primary={`${club.clubName} : ${club.role}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
          </DialogContent>
        </Card>
      ) : (
        <DialogContent sx={{ width: "512px" }}>
          <DialogContentText id="alert-dialog-description">
            오류가 생겼습니다.
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
}
