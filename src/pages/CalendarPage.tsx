import styled from "styled-components";
import Calendar from "react-calendar";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";

const CalendarContainer = styled.div`
  padding-top: 80px;
  display: flex;
  justify-content: center;
`;

interface IDayDetailOverlay {
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

const DayDetailBoard = styled.div<IDayDetailOverlay>`
  position: fixed;
  top: 10%;
  transform: translateX(-50%);
  left: 50%;
  width: 100%;
  max-width: 1024px;
  height: 800px;
  background-color: aliceblue;
  display: ${(props) => (props.isDayDetailOpened ? "flex" : "none")};
`;

function CalendarPage() {
  const [value, onChange] = useState(new Date());
  const handleDayClick = () => {
    setIsDayDetailOpened((prev) => !prev);
  };

  const [isDayDetailOpened, setIsDayDetailOpened] = useState(false);
  return (
    <>
      <CalendarContainer>
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDayClick}
        />
      </CalendarContainer>
      <DayDetailOverlay
        isDayDetailOpened={isDayDetailOpened}
        onClick={handleDayClick}
      ></DayDetailOverlay>
      <DayDetailBoard isDayDetailOpened={isDayDetailOpened}></DayDetailBoard>
    </>
  );
}

export default CalendarPage;
