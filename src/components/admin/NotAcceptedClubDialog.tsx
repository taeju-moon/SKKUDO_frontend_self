import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { NotAcceptedClubType } from "../../types/club";

interface NotAcceptedClubDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickedClub: NotAcceptedClubType | undefined;
}

export default function NotAcceptedClubDialog({
  open,
  setOpen,
  clickedClub,
}: NotAcceptedClubDialogType) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">동아리 신청 내용</DialogTitle>
      {clickedClub ? (
        <>
          <DialogContent sx={{ width: "512px" }}>
            <DialogContentText id="alert-dialog-description">
              {`동아리 이름 : ${clickedClub.name}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`위치 : ${clickedClub.location}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`모집 방식 : ${clickedClub.recruitType}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`동아리 주제 : ${clickedClub.type.name}`}
            </DialogContentText>
          </DialogContent>
        </>
      ) : (
        <DialogContent sx={{ width: "512px" }}>
          <DialogContentText id="alert-dialog-description">
            오류가 생겼습니다.
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          승인
        </Button>
        <Button color="error" onClick={handleClose}>
          거절
        </Button>
      </DialogActions>
    </Dialog>
  );
}
