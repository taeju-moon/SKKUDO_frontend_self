//slogan page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import exampleImage from "../assets/images/example.png";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";

const MainContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 100px;
  padding-right: 5%;
  flex-direction: row;
`;

const AboutImageContainer = styled.div``;

function AboutMainPage() {
  return (
    <MainContainer>
      <img src={exampleImage}></img>

      {/* <div
      style={{ height: "500px", width: "100%", backgroundColor: "" }}
      ></div> */}
    </MainContainer>
  );
}

export default AboutMainPage;
