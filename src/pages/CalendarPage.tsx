import styled from "styled-components";
import Calendar from "react-calendar";
import { useState } from "react";

import "./CustomCalendarStyle.css";
import moment from "moment";
import ClubDetailHeader from "../components/ClubDetailHeader";
import { getTodosByClubID } from "../utils/fetch";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ToDoType } from "../types/todo";
import DayDetailBoard from "../components/calendarComponents/DayDetailBoard";
import TodoCategoryDialog from "../components/calendarComponents/TodoCategoryDialog";
import { useRecoilState } from "recoil";
import { dayDetailState } from "../atoms/calendarAtom";
import { motion } from "framer-motion";

const CalendarContainer = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: center;
`;

const BtnContainer = styled("div")({
  display: "flex",
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  justifyContent: "flex-end",
  marginTop: "20px",
  gap: "20px",
});

const AddCategoryBtn = styled(motion.button)({
  backgroundColor: "transparent",
  color: "#0c4426",
  fontWeight: "600",
  paddingLeft: "10px",
  paddingRight: "10px",
  height: "50px",
  border: "2px solid ",
  borderRadius: "10px",
  fontSize: "20px",
});

export interface IDayDetailOverlay {
  isDayDetailOpened: boolean;
}
const DayDetailOverlay = styled.div<IDayDetailOverlay>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isDayDetailOpened ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin: 0 auto;
`;

function CalendarPage() {
  const [value, onChange] = useState(new Date());
  const { clubID } = useParams();
  const [mark, setMark] = useState<string[]>(["2022-10-02", "2022-10-23"]);

  const [dayDetail, setDayDetail] = useRecoilState(dayDetailState);

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const handleClose = () => {
    setIsCategoryDialogOpen(false);
  };

  const handlClickOpen = () => {
    setIsCategoryDialogOpen(true);
  };

  const { data, isLoading } = useQuery<ToDoType[]>(
    "getTodosByClubID",
    () => getTodosByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        const newMark: string[] = [];
        data.map((todo) =>
          newMark.push(moment(todo.date).format("YYYY-MM-DD"))
        );
        setMark(newMark);
        console.log(data);
      },
    }
  );

  const handleDayClick = (value: Date) => {
    const selectedDate = moment(value).format("YYYY-MM-DD");
    const selectedTodos: ToDoType[] = [];
    if (data) {
      data.forEach((todo) => {
        if (moment(todo.date).format("YYYY-MM-DD") === selectedDate) {
          selectedTodos.push(todo);
        }
      });
    }
    setDayDetail(selectedTodos);
    setIsDayDetailOpened((prev) => !prev);
  };

  const [isDayDetailOpened, setIsDayDetailOpened] = useState(false);
  return (
    <>
      <ClubDetailHeader pageType="일정" />
      <BtnContainer>
        <AddCategoryBtn
          whileHover={{
            backgroundColor: "#0c4426",
            color: "#FFFFFF",
            border: "1px solid #FFFFFF",
          }}
          onClick={handlClickOpen}
        >
          카테고리 추가
        </AddCategoryBtn>
      </BtnContainer>
      <TodoCategoryDialog open={isCategoryDialogOpen} onClose={handleClose} />
      <CalendarContainer>
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDayClick}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileContent={({ date, view }) => {
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return <Dot></Dot>;
            } else {
              return <div></div>;
            }
          }}
        />
      </CalendarContainer>
      <DayDetailOverlay
        isDayDetailOpened={isDayDetailOpened}
        onClick={() => setIsDayDetailOpened(false)}
      ></DayDetailOverlay>
      <DayDetailBoard
        date={value}
        isDayDetailOpened={isDayDetailOpened}
      ></DayDetailBoard>
    </>
  );
}

export default CalendarPage;
