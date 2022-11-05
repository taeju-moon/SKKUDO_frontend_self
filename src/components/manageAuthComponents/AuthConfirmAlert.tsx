import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthConfirmAlertOpenState } from "../../atoms/alertAtom";
import { RoleType } from "../../types/common";
import { UpdateValidationType } from "../../types/validation";
import { updateValidation } from "../../utils/fetch";

interface AuthConfirmAlertType {
  selectedLabel: string;
  selectedKey: string;
  selectedValue: string;
}
//전달받은 레이블과 키로 validadtion update
export default function AuthConfirmAlert({
  selectedLabel,
  selectedKey,
  selectedValue,
}: AuthConfirmAlertType) {
  const { clubID } = useParams();
  const queryClient = useQueryClient();
  const [open, setOpen] = useRecoilState(isAuthConfirmAlertOpenState);

  const { mutate } = useMutation(
    (validatinInfo: UpdateValidationType) =>
      updateValidation(clubID || "", validatinInfo),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getValidationByClubID");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgreeBtnClcik = () => {
    console.log({ [selectedKey]: selectedValue });
    setOpen(false);
    mutate({ [selectedKey]: selectedValue });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{selectedLabel}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${selectedLabel}을 ${selectedValue}까지로 변경하시겠습니까?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgreeBtnClcik} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
