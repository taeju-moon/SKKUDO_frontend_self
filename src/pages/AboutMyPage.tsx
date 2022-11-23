//AboutMyPage Page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";
import mypage from "../assets/images/mypage/mypage.png";

const AboutMyPageContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: row;
  flex: 1;
`;


const MyPageContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const MyPageMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const MyPageImageContainer =styled.div`
  padding-left:5%;
  display:flex;
  height: 400px;
`


function AboutMyPage() {
  return (
    <AboutMyPageContainer>
      <MyPageContainer>
        <MyPageMassageContainer>
          <br/>
          상단 메뉴에서 My Page를 클릭하시면 오른쪽 그림과 같이
          개인정보를 확인하실 수 있습니다.
          <br/>
          해당 페이지에서는 개인정보 뿐만 아니라 소속 동아리 및 지원중인 동아리에 대한 정보가 표시됩니다.
        </MyPageMassageContainer>
        <MyPageImageContainer><img src={mypage}></img></MyPageImageContainer>
      </MyPageContainer>
    </AboutMyPageContainer>
  );
}

export default AboutMyPage;