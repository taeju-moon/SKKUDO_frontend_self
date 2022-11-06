import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { AppliedUserType } from "../../types/apply";
import styled from "@emotion/styled";

const AnswerItem = styled.div``;
const AnswerTitle = styled.div``;
const AnswerContent = styled.div``;

interface DocumentDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applierInfo: AppliedUserType | undefined;
}
export default function DocumentDialog({
  open,
  setOpen,
  applierInfo,
}: DocumentDialogType) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={open}
        onClose={handleClose}
      >
        {applierInfo ? (
          <>
            <DialogTitle>Optional sizes</DialogTitle>
            <DialogContent>
              {applierInfo.documentAnswers.map((answer, idx) => (
                <AnswerItem key={idx}>
                  <AnswerTitle>{`서류질문 ${idx} 답변`}</AnswerTitle>
                  <AnswerContent>{answer}</AnswerContent>
                </AnswerItem>
              ))}
              {applierInfo.moreColumns.map((column) => (
                <AnswerItem key={column.column._id}>
                  <AnswerTitle>{`${column.column.key}`}</AnswerTitle>
                  <AnswerContent>{`${column.value}`}</AnswerContent>
                </AnswerItem>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
        ) : (
          <DialogTitle>지원서 세부정보가 존재하지 않습니다.</DialogTitle>
        )}
      </Dialog>
    </React.Fragment>
  );
}
