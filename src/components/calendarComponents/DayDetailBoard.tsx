import styled from "styled-components";
import { IDayDetailOverlay } from "../../pages/CalendarPage";
import { MdOutlineAlarmAdd } from "react-icons/md";
import { useState } from "react";
import TodoAddDialog from "./TodoAddDialog";

const BoardContainer = styled.div<IDayDetailOverlay>`
  position: fixed;
  top: 10%;
  transform: translateX(-50%);
  left: 50%;
  width: 100%;
  max-width: 1024px;
  height: 800px;
  background-color: aliceblue;
  display: ${(props) => (props.isDayDetailOpened ? "flex" : "none")};
  flex-direction: column;
`;

const TodoAddBtn = styled.button``;

interface DayDetailBoardType {
  isDayDetailOpened: boolean;
}

function DayDetailBoard({ isDayDetailOpened }: DayDetailBoardType) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleTodoAddBtnClick = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <BoardContainer isDayDetailOpened={isDayDetailOpened}>
      <TodoAddBtn onClick={handleTodoAddBtnClick}>
        <MdOutlineAlarmAdd size="3rem" />
      </TodoAddBtn>
      <TodoAddDialog open={dialogOpen} onClose={handleDialogClose} />
    </BoardContainer>
  );
}

export default DayDetailBoard;
