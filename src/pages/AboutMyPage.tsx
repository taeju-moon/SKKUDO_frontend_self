//AboutMyPage Page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";

const AboutMyPageContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: row;
`;

const UseExampleImageContainer = styled.div``;

function AboutMyPage() {
  return (
    <AboutMyPageContainer>
      
    </AboutMyPageContainer>
  );
}

export default AboutMyPage;