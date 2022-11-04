import * as React from "react";
import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Box, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createNoticeTag,
  createTodoTag,
  deleteTodoTag,
  getTodoTagsByClubID,
} from "../../utils/fetch";
import { useParams } from "react-router-dom";
import {
  CategoryDeleteBtn,
  CategoryLabel,
  CategoryList,
  CategoryListItem,
} from "../noticeComponents/CategoryAddDialog";
import { DeleteNoticetype } from "../../types/notice";
import { DeleteTodoType, ToDoTagType } from "../../types/todo";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function TodoCategoryDialog(props: SimpleDialogProps) {
  const { clubID } = useParams();
  const [newCategory, setNewCategory] = React.useState("");
  const queryClient = useQueryClient();
  const { onClose, open } = props;

  const { data, isLoading } = useQuery<ToDoTagType[]>(
    "getTodoTagsByClubID",
    () => getTodoTagsByClubID(clubID || "")
  );

  const { mutate: createTodoTagMutate } = useMutation(
    () => createTodoTag({ clubId: clubID || "", name: newCategory }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getTodoTagsByClubID");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { mutate: deleteTodoTagMutate } = useMutation(
    (tagInfo: DeleteTodoType) => deleteTodoTag(tagInfo),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getTodoTagsByClubID");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const handleClose = () => {
    onClose();
  };
  const handleCategoryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setNewCategory(event.target.value);
  };
  const handleNewCategorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTodoTagMutate();
  };

  const handleCategoryDeleteBtnClick = (tagID: string) => {
    if (clubID) {
      deleteTodoTagMutate({ _id: tagID, clubId: clubID });
    }
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>일정 카테고리 추가하기</DialogTitle>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          padding: "50px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleNewCategorySubmit}
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleCategoryInputChange}
        />
        <Button
          variant="contained"
          color="success"
          sx={{ color: "white", marginTop: "20px" }}
          type="submit"
        >
          Success
        </Button>
      </Box>
      <CategoryList>
        {isLoading ? (
          <div>no category</div>
        ) : (
          data?.map((category) => (
            <CategoryListItem key={category._id}>
              <CategoryLabel>{category.name}</CategoryLabel>
              <CategoryDeleteBtn
                onClick={() => handleCategoryDeleteBtnClick(category._id)}
              >
                Delete
              </CategoryDeleteBtn>
            </CategoryListItem>
          ))
        )}
      </CategoryList>
    </Dialog>
  );
}

export default TodoCategoryDialog;
