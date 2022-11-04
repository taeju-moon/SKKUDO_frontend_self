import styled from "styled-components";
import Calendar from "react-calendar";
import React, { useState } from "react";
// import "react-calendar/dist/Calendar.css";
import "./CustomCalendarStyle.css";
import moment from "moment";
import ClubDetailHeader from "../components/ClubDetailHeader";
import { getTodosByClubID } from "../utils/fetch";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ToDoType } from "../types/todo";
import DayDetailBoard from "../components/calendarComponents/DayDetailBoard";
import TodoCategoryDialog from "../components/calendarComponents/TodoCategoryDialog";

const CalendarContainer = styled.div`
  padding-top: 80px;
  display: flex;
  justify-content: center;
`;

const AddCategoryBtn = styled("button")({});
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
  const handleDayClick = (value: Date) => {
    console.log(value);
    setIsDayDetailOpened((prev) => !prev);
  };

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const handleClose = () => {
    setIsCategoryDialogOpen(false);
  };

  const handlClickOpen = () => {
    setIsCategoryDialogOpen(true);
  };

  const { data, isLoading } = useQuery<ToDoType[]>("getTodosByClubID", () =>
    getTodosByClubID(clubID || "")
  );

  // console.log(data);

  const mark = ["2022-10-02", "2022-10-23"];
  const [isDayDetailOpened, setIsDayDetailOpened] = useState(false);
  return (
    <>
      <ClubDetailHeader pageType="일정" />
      <AddCategoryBtn onClick={handlClickOpen}>카테고리 추가</AddCategoryBtn>
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
      <DayDetailBoard isDayDetailOpened={isDayDetailOpened}></DayDetailBoard>
    </>
  );
}

export default CalendarPage;
