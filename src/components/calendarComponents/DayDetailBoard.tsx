import styled from "styled-components";
import { IDayDetailOverlay } from "../../pages/CalendarPage";
import { MdExpandLess, MdExpandMore, MdOutlineAlarmAdd } from "react-icons/md";
import { useState } from "react";
import TodoAddDialog from "./TodoAddDialog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  dayDetailState,
  isTodoUpdateState,
  updateTodoInfoState,
} from "../../atoms/calendarAtom";
import { useMutation, useQueryClient } from "react-query";
import { DeleteTodoType, UpdateTodoType } from "../../types/todo";
import { deleteTodo } from "../../utils/fetch";
import { useParams } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";

const BoardContainer = styled.div<IDayDetailOverlay>`
  position: fixed;
  top: 10%;
  transform: translateX(-50%);
  left: 50%;
  width: 100%;
  max-width: 1024px;
  height: 800px;
  background-color: white;
  display: ${(props) => (props.isDayDetailOpened ? "flex" : "none")};
  flex-direction: column;
  border-radius: 20px;
`;

const TodoAddBtn = styled(motion.button)`
  border: none;
  background-color: transparent;
  box-shadow: 0px 3px 3px #0c4426;

  background: linear-gradient(45deg, #0c4426, #244f36);
  padding: 10px;
  color: #dde143;
`;

interface DayDetailBoardType {
  isDayDetailOpened: boolean;
  date: Date;
}

const ItemContainer = styled.div`
  padding-left: 40px;
  padding-right: 40px;
`;

const Tag = styled.div`
  height: 100%;
  background-color: #0c4426;
  color: white;
  border-radius: 4px;
  padding: 5px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 10px;
`;

function DayDetailBoard({ isDayDetailOpened, date }: DayDetailBoardType) {
  const { clubID } = useParams();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const dayDetail = useRecoilValue(dayDetailState);
  const setIsTodoUpdate = useSetRecoilState(isTodoUpdateState);
  const setUpdateTodo = useSetRecoilState(updateTodoInfoState);

  const { mutate: deleteTodoMutate } = useMutation(
    (todoInfo: DeleteTodoType) => deleteTodo(todoInfo),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getTodosByClubID");
        window.location.reload();
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const handleTodoDeleteBtnClick = (todoID: string) => {
    if (clubID) {
      deleteTodoMutate({ clubId: clubID, _id: todoID });
    }
  };

  const handleTodoAddBtnClick = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTodoUpdateBtnClick = (tagInfo: UpdateTodoType) => {
    setIsTodoUpdate(true);
    setUpdateTodo(tagInfo);
    setDialogOpen(true);
  };

  const [open, setOpen] = useState("");

  const handleClick = (id: string) => {
    if (id === open) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  const checkOpen = (id: string) => {
    if (id === open) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <BoardContainer isDayDetailOpened={isDayDetailOpened}>
      <TodoAddBtn
        whileHover={{
          background: "linear-gradient(45deg,  #244f36, #0c4426)",
        }}
        onClick={handleTodoAddBtnClick}
      >
        <MdOutlineAlarmAdd size="3rem" />
      </TodoAddBtn>

      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{
              fontSize: "40px",
              width: "100%",
              padding: "20px",
            }}
            component="div"
            id="nested-list-subheader"
          >
            {`${moment(date).format("YYYY-MM-DD")} 일정 목록`}
          </ListSubheader>
        }
      >
        {dayDetail.map((todo) => (
          <ItemContainer key={todo._id}>
            <ListItemButton
              onClick={() => handleClick(todo._id)}
              sx={{ padding: "20px" }}
            >
              <ListItemText
                disableTypography
                sx={{ fontSize: "24px", fontWeight: 700 }}
                primary={todo.title}
              />
              <Stack
                sx={{
                  justifyContent: "flex-end",
                  height: "30px",
                  marginRight: "40px",
                }}
                spacing={2}
                direction={"row"}
              >
                {todo.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Stack>
              {open ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={checkOpen(todo._id)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    disableTypography
                    sx={{ fontSize: "20px" }}
                    primary={todo.content}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    disableTypography
                    sx={{ fontSize: "20px" }}
                    primary={`시작 시간 : ${moment(todo.startTime).format(
                      "YYYY-MM-DD HH:mm"
                    )}`}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    disableTypography
                    sx={{ fontSize: "20px" }}
                    primary={`종료 시간 : ${moment(todo.endTime).format(
                      "YYYY-MM-DD HH:mm"
                    )}`}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    disableTypography
                    sx={{ fontSize: "20px" }}
                    primary={`침여 인원 : ${todo.attendingUsers.join(" ")}`}
                  />
                </ListItemButton>
                <DetailBtnContainer>
                  <Button
                    onClick={() => handleTodoDeleteBtnClick(todo._id)}
                    sx={{
                      width: "30%",
                      fontSize: "20px",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                    variant="outlined"
                    color="error"
                  >
                    삭제
                  </Button>
                  <Button
                    onClick={() =>
                      handleTodoUpdateBtnClick({
                        _id: todo._id,
                        clubId: todo.clubId,
                        title: todo.title,
                        content: todo.content,
                        date: moment(todo.date).format("YYYY-MM-DD"),
                        startTime: moment(todo.startTime).format(
                          "YYYY-MM-DD HH:mm"
                        ),
                        endTime: moment(todo.endTime).format(
                          "YYYY-MM-DD HH:mm"
                        ),
                        attendingUsers: todo.attendingUsers,
                        tags: todo.tags,
                      })
                    }
                    sx={{
                      width: "30%",
                      fontSize: "20px",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                    variant="outlined"
                    color="primary"
                  >
                    수정
                  </Button>
                </DetailBtnContainer>
              </List>
            </Collapse>
          </ItemContainer>
        ))}
      </List>
      <TodoAddDialog open={dialogOpen} onClose={handleDialogClose} />
    </BoardContainer>
  );
}

export default DayDetailBoard;
