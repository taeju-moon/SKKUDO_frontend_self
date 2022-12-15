import styled from "styled-components";
import { IDayDetailOverlay } from "../../pages/CalendarPage";
import { MdExpandLess, MdExpandMore, MdOutlineAlarmAdd } from "react-icons/md";
import { useState } from "react";
import TodoAddDialog from "./TodoAddDialog";
import { useRecoilValue } from "recoil";
import { dayDetailState } from "../../atoms/calendarAtom";

import moment from "moment";
import { motion } from "framer-motion";
import { List, ListSubheader } from "@mui/material";
import DayItem from "./DayItem";

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
  z-index: 10;
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

function DayDetailBoard({ isDayDetailOpened, date }: DayDetailBoardType) {
  const dayDetail = useRecoilValue(dayDetailState);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTodoAddBtnClick = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
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
              fontSize: "35px",
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
          <DayItem key={todo._id} todo={todo} setDialogOpen={setDialogOpen} />
        ))}
      </List>
      <TodoAddDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        date={date}
      />
    </BoardContainer>
  );
}

export default DayDetailBoard;
