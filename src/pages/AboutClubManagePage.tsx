//AboutClubManage Page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";

const AboutClubManageContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: row;
`;

const UseExampleImageContainer = styled.div``;

function AboutClubManage() {
  return (
    <AboutClubManageContainer></AboutClubManageContainer>
  );
}

export default AboutClubManage;