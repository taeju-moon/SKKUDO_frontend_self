//slogan page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import exampleImage from "../assets/images/example.png";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";
import { ImWrench } from "react-icons/im";
import { TiGroupOutline } from "react-icons/ti";
import { GrAction } from "react-icons/gr";

const MainContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 30px;
  flex-direction: column;
`;

const AboutIntroduceContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;

`
const IntroduceMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 400px;
`
const LogoContainer =styled.div`
  display:flex;
`
const FirstMassageContainer = styled.div`
  display:flex;
`
const SecondMassageContainer = styled.div`
  padding-top: 2%;
  display:flex;
`
const SloganContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  
  padding-top: 5%;
  padding-bottom: 5%;
  display: flex;
  height: 200px;
  flex-direction: column;
  
`
const SloganMassage = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 3%
`

const VisionContainer = styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  padding-top: 5%;
  padding-bottom: 5%;
  display: flex;
  height: 200px;
  flex-direction: column;
`
const VisionMassageContainer = styled.div`
  padding-bottom:3%;
  display: flex;
  justify-content: center;
`
const IconContainer = styled.div`
  display:flex;
  padding-top: 3%;
  height:300px;
  flex-direction: row;
  justify-content: center;
`
const MainIconContainer = styled.div`
  padding-left:5%;
  padding-right:5%;
  padding-top:3%;
  padding-bottom:3%;
  margin-left: 20px;
  margin-right: 20px;
  border-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display:flex;
  flex-direction: column;
`
const MainIConMassageContainer =styled.div`
  display:flex;
  padding-top:5%;
  justify-content: center;
`

function AboutMainPage() {
  return (
    <MainContainer>
      <AboutIntroduceContainer>
        <IntroduceMassageContainer>
          <FirstMassageContainer>동아리 활동은 대학 생활의 꽃이라고도 합니다. 학생들은 대학 생활 동안 단순히 동아리 활동에 참여하는 것뿐만이 아니라 동아리를 관리하면서 더 많은 것을 배우고, 소통하고, 자신의 미래에 대해 깊은 고민을 하기도 하죠. 하지만 대학교에 다양한 동아리가 있는 만큼 주변에 동아리 관리로 어려움을 겪고 있는 학우들을 어렵지 않게 발견할 수 있습니다. 동아리의 규모가 커지면서 동아리 부원들을 관리하는데 어려움을 겪거나, 모집 기간과 같이 동아리가 바쁜 특정 시기 동안 수많은 일정을 조율하는데 불필요한 에너지를 낭비하는 것입니다.</FirstMassageContainer>
          <SecondMassageContainer>동아리 회비는 엑셀로 관리하고, 동아리 일정은 노션으로 정리하며, 동아리 공지사항은 카카오톡 그룹채팅으로 전달... 동아리 활동을 해보았다면 흔하게 겪을 수 있는 상황입니다. 동아리 관리자 입장에서도, 일반 동아리 부원 입장에서도 불편하고 귀찮습니다. 동아리에 가입하고 싶은 학생들은 우리학교에 어떤 동아리가 있는지, 모집기간은 어떻게 되는지 등을 일일이 찾아보아야 하죠. 동아리 관리자들이 더 효율적으로 동아리를 관리할 수 있는 방법이 없을까? 동아리 부원들이 더 간편하게 동아리의 공지와 일정을 확인할 수 있는 방법이 없을까? 동아리에 가입하고 싶은 학생들이 더 쉽게 우리학교의 동아리를 둘러보고 지원할 수 있는 방법이 없을까? SKKUDO는 이러한 생각으로부터 출발하게 되었습니다.</SecondMassageContainer>
        </IntroduceMassageContainer>
        <LogoContainer><img src={exampleImage}></img></LogoContainer>
      </AboutIntroduceContainer>
      <SloganContainer>
        <SloganMassage>SKKUDO의 목표</SloganMassage>
        <SloganMassage>“Customizable, But Easy to Use.”</SloganMassage>
        <SloganMassage>SKKUDO는 쉽고 편리하게 동아리들을 지원합니다.</SloganMassage>
      </SloganContainer>
      <VisionContainer>
        <VisionMassageContainer>SKKUDO의 비전</VisionMassageContainer>
        <IconContainer>
          <MainIconContainer>
            <ImWrench size ="150px" color="#0c4426" ></ImWrench>
            <MainIConMassageContainer>hihi</MainIConMassageContainer>
          </MainIconContainer>
          <MainIconContainer>
            <TiGroupOutline size ="150px" color="#0c4426" ></TiGroupOutline>
            <MainIConMassageContainer>hihi</MainIConMassageContainer>
          </MainIconContainer>
          <MainIconContainer>
            <GrAction size ="150px" color="#0c4426" ></GrAction>
            <MainIConMassageContainer>hihi</MainIConMassageContainer>
          </MainIconContainer>
        </IconContainer>
      </VisionContainer>
      {/* <div
      style={{ height: "500px", width: "100%", backgroundColor: "" }}
      ></div> */}
    </MainContainer>
  );
}

export default AboutMainPage;
