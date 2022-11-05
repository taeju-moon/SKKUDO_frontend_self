import styled from "styled-components";
import { IDayDetailOverlay } from "../../pages/CalendarPage";
import { MdOutlineAlarmAdd } from "react-icons/md";
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
`;

const TodoAddBtn = styled.button``;

const TodoList = styled.ul``;
const TodoItem = styled.li``;
const TodoTitle = styled.div``;
const TodoDeleteBtn = styled.button``;
const TodoUpdateBtn = styled.button``;

interface DayDetailBoardType {
  isDayDetailOpened: boolean;
}

function DayDetailBoard({ isDayDetailOpened }: DayDetailBoardType) {
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
      onError: (error) => console.log(error),
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

  return (
    <BoardContainer isDayDetailOpened={isDayDetailOpened}>
      <TodoAddBtn onClick={handleTodoAddBtnClick}>
        <MdOutlineAlarmAdd size="3rem" />
      </TodoAddBtn>
      <TodoList>
        {dayDetail.map((todo) => (
          <TodoItem key={todo._id}>
            <TodoTitle>{todo.title}</TodoTitle>
            <TodoDeleteBtn onClick={() => handleTodoDeleteBtnClick(todo._id)}>
              삭제
            </TodoDeleteBtn>
            <TodoUpdateBtn
              onClick={() =>
                handleTodoUpdateBtnClick({
                  _id: todo._id,
                  clubId: todo.clubId,
                  title: todo.title,
                  content: todo.content,
                  date: moment(todo.date).format("YYYY-MM-DD"),
                  startTime: moment(todo.startTime).format("YYYY-MM-DD HH:mm"),
                  endTime: moment(todo.endTime).format("YYYY-MM-DD HH:mm"),
                  attendingUsers: todo.attendingUsers,
                  tags: todo.tags,
                })
              }
            >
              수정
            </TodoUpdateBtn>
          </TodoItem>
        ))}
      </TodoList>
      <TodoAddDialog open={dialogOpen} onClose={handleDialogClose} />
    </BoardContainer>
  );
}

export default DayDetailBoard;
