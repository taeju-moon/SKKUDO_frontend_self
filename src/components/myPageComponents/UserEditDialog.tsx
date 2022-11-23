import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useMutation } from "react-query";
import { updateUser } from "../../utils/fetch";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../atoms/userAtom";

interface UserEditDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserEditDialog({ open, setOpen }: UserEditDialogType) {
  const loggedInUser = useRecoilValue(loggedInUserState);
  const [contact, setContact] = useState("");

  const { mutate } = useMutation(
    () =>
      updateUser(
        loggedInUser?.userID || "",
        `${contact.substring(0, 3)}-${contact.substring(
          3,
          7
        )}-${contact.substring(7, 11)}`
      ),
    {
      onSuccess: (data) => alert("연락처가 성공적으로 변경되었습니다."),
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact(event.target.value);
  };

  const handleContactSubmit = () => {
    if (loggedInUser) {
      mutate();
      window.location.reload();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle width="500px">연락처 수정 (번호만 입력해주세요)</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="연락처"
          type="number"
          fullWidth
          variant="standard"
          onChange={handleContactChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleContactSubmit}>수정</Button>
      </DialogActions>
    </Dialog>
  );
}
