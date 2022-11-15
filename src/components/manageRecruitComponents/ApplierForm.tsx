import { Button, Card, ListItem, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  ApplierType,
  NewAppliedUserColumnsType,
  UpdateApplierType,
} from "../../types/apply";
import { getApplierByClubID, updateApplier } from "../../utils/fetch";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import { HiOutlineDocument, HiOutlineDocumentAdd } from "react-icons/hi";
import { TbSpeakerphone } from "react-icons/tb";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ApplierForm() {
  const { clubID } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [dialogType, setDialogType] = useState("");
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  // const [applier, setApplier] = useState<ApplierType>();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<ApplierType>(
    "getApplierByClubID",
    () => getApplierByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
        // setApplier(data);
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate } = useMutation(
    (applierInfo: UpdateApplierType) =>
      updateApplier(clubID || "", applierInfo),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getApplierByClubID");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDeleteBtnClick = (key: string, idx: number) => {
    if (data) {
      if (key === "document") {
        const newQuestions = data.documentQuestions;
        newQuestions.splice(idx, 1);
        mutate({ documentQuestions: newQuestions });
      } else if (key === "interview") {
        const newQuestions = data.interviewQuestions;
        newQuestions.splice(idx, 1);
        mutate({ interviewQuestions: newQuestions });
      } else if (key === "more") {
        const newQuestions = data.appliedUserColumns;
        newQuestions.splice(idx, 1);
        mutate({ appliedUserColumns: newQuestions });
      }
    }
  };

  const handleAddBtnClick = (key: string) => {
    setDialogOpen(true);
    setDialogType(key);
  };

  const handleNewQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewQuestion(event.target.value);
  };

  const handleNewQuestionSubmit = (key: string) => {
    if (data) {
      setDialogOpen(false);
      if (key === "document") {
        const newQuestions = data.documentQuestions;
        newQuestions.push(newQuestion);
        mutate({ documentQuestions: newQuestions });
      } else if (key === "interview") {
        const newQuestions = data.interviewQuestions;
        newQuestions.push(newQuestion);
        mutate({ interviewQuestions: newQuestions });
      } else if (key === "more") {
        const newQuestions: NewAppliedUserColumnsType[] =
          data.appliedUserColumns;
        newQuestions.push({ key: newQuestion, valueType: "string" });
        mutate({ appliedUserColumns: newQuestions });
      }
    }
  };
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          모집 지원서 항목
        </ListSubheader>
      }
    >
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineDocument />
            </ListItemIcon>
            <ListItemText primary="서류 질문" />
            <MdExpandMore />
          </ListItemButton>
          <Collapse in={true} timeout="auto" unmountOnExit>
            {data?.documentQuestions.map((q, idx) => (
              <List key={q} component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={q} />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteBtnClick("document", idx)}
                  >
                    삭제
                  </Button>
                </ListItem>
              </List>
            ))}
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={() => handleAddBtnClick("document")}
                >
                  질문 추가하기
                </Button>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineDocumentAdd />
            </ListItemIcon>
            <ListItemText primary="추가 질문" />
            <MdExpandMore />
          </ListItemButton>
          <Collapse in={true} timeout="auto" unmountOnExit>
            {data?.appliedUserColumns.map((column, idx) => (
              <List key={column._id} component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={column.key} />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteBtnClick("more", idx)}
                  >
                    삭제
                  </Button>
                </ListItem>
              </List>
            ))}
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={() => handleAddBtnClick("more")}
                >
                  질문 추가하기
                </Button>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemIcon>
              <TbSpeakerphone />
            </ListItemIcon>
            <ListItemText primary="면접 질문" />
            <MdExpandMore />
          </ListItemButton>
          <Collapse in={true} timeout="auto" unmountOnExit>
            {data?.interviewQuestions.map((q, idx) => (
              <List key={q} component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={q} />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteBtnClick("interview", idx)}
                  >
                    삭제
                  </Button>
                </ListItem>
              </List>
            ))}
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={() => handleAddBtnClick("interview")}
                >
                  질문 추가하기
                </Button>
              </ListItem>
            </List>
          </Collapse>
        </>
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>질문 추가하기</DialogTitle>
        <DialogContent style={{ width: "512px" }}>
          <DialogContentText>추가하고 싶은 질문을 적어주세요</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="question"
            fullWidth
            variant="standard"
            value={newQuestion}
            onChange={handleNewQuestionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => handleNewQuestionSubmit(dialogType)}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}

export default ApplierForm;
