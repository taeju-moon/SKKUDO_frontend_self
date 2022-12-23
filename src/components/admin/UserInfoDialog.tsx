import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "react-query";
import { NotAcceptedClubType } from "../../types/club";
import { UserType } from "../../types/user";
import { accpetClub, deleteClub } from "../../utils/fetch/fetchClub";

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

  // const onAcceptBtnClicked = () => {
  //   if (clickedClub) {

  //     setOpen(false);
  //   }
  // };

  // const onDeleteBtnClicked = () => {
  //   if (clickedClub) {

  //     setOpen(false);
  //   }
  // };
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
            <DialogContentText id="alert-dialog-description">
              {`유저 이름 : ${clickedUser.name}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`학과 : ${clickedUser.major}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`연락처 : ${clickedUser.contact}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`아이디 : ${clickedUser.userID}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`가입된 동아리 : ${Object.values(clickedUser.registeredClubs)
                .map((club) => club.clubName)
                .join(", ")}`}
            </DialogContentText>
          </DialogContent>
        </Card>
      ) : (
        <DialogContent sx={{ width: "512px" }}>
          <DialogContentText id="alert-dialog-description">
            오류가 생겼습니다.
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button autoFocus>승인</Button>
        <Button color="error">거절</Button>
      </DialogActions>
    </Dialog>
  );
}
