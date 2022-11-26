//slogan page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import exampleImage from "../assets/images/example.png";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";
import { ImWrench } from "react-icons/im";
import { TiGroupOutline } from "react-icons/ti";
import { GrAction } from "react-icons/gr";
import { TbPlugConnected } from "react-icons/tb";
import myeong from "../assets/images/myeong.jpeg";
import yul from "../assets/images/yul.png";

const MainContainer = styled.div`
  /* position: relative; */
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;

  overflow-x: visible;
  flex-direction: column;
`;

const Hello = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 100px;
`;
const AboutIntroduceContainer = styled.div`
  border-top-style: solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top: 80px;
  padding-bottom: 80px;
`;
const IntroduceMassageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;
const ImageContainer = styled.div`
  padding: 20px;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FirstMassageContainer = styled.div`
  /* display: flex; */
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
`;
const SecondMassageContainer = styled.div`
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
`;
const SloganContainer = styled.div`
  background-color: #0c4426;
  padding-top: 80px;
  padding-bottom: 80px;
  display: flex;
  gap: 40px;
  flex-direction: column;
  width: 500%;
  margin-left: -208%;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.7);
`;
const SloganMassage = styled.div`
  display: flex;
  justify-content: center;
  color: #dde143;
  font-size: 60px;
  font-weight: 700;
`;

const VisionContainer = styled.div`
  border-color: #0c4426;
  padding-top: 80px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
`;
const VisionMassageContainer = styled.div`
  padding-bottom: 40px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #0c4426;
`;
const IconContainer = styled.div`
  display: flex;
  padding-top: 40px;

  flex-direction: row;
  justify-content: center;
`;
const MainIconContainer = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 3%;
  padding-bottom: 3%;
  margin-left: 20px;
  margin-right: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  color: #0c4426;
`;
const MainIConMassageContainer = styled.div`
  display: flex;
  margin-top: 30px;
  font-weight: 600;
  justify-content: center;
`;

const DistinctContainer = styled.div`
  border-top-style: solid;
  border-width: 1px;
  border-color: #0c4426;
  padding-top: 5%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: row;
`;

const DistinctMassageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  flex: 1;
`;

function AboutMainPage() {
  return (
    <MainContainer>
      <Hello>안녕하세요, SKKUDO 입니다.</Hello>
      <AboutIntroduceContainer>
        <IntroduceMassageContainer>
          <FirstMassageContainer>
            동아리 활동은 대학 생활의 꽃이라고도 합니다.
            <br /> 학생들은 대학 생활 동안 단순히 동아리 활동에 참여하는
            것뿐만이 아니라 동아리를 관리하면서 더 많은 것을 배우고, 소통하고,
            자신의 미래에 대해 깊은 고민을 하기도 하죠.
            <br />
            <br /> 하지만 대학교에 다양한 동아리가 있는 만큼, 주변에서 동아리
            관리로 어려움을 겪는 학우들을 쉽게 발견할 수 있습니다. 동아리의
            규모가 커지면서 동아리 부원관리에 어려움을 겪거나, 모집 기간과 같은
            동아리가 바쁜 시기 동안 수많은 일정을 조율하는데 불필요한 에너지를
            낭비하는 학우들의 모습을 보며 SKKUDO는 고민했습니다.
            <br />
            <br />
          </FirstMassageContainer>
          <SecondMassageContainer>
            동아리 관리자들이 더 효율적으로 동아리를 관리할 수 있는 방법이
            없을까? 동아리 부원들이 더 간편하게 동아리의 공지와 일정을 확인할 수
            있는 방법이 없을까? 동아리에 가입하고 싶은 학생들이 더 쉽게
            우리학교의 동아리를 둘러보고 지원할 수 있는 방법이 없을까?
            <br />
            <br />
            SKKUDO는 이러한 생각으로부터 출발하게 되었습니다.
          </SecondMassageContainer>
        </IntroduceMassageContainer>
        <ImageContainer>
          <img src={yul}></img>
        </ImageContainer>
      </AboutIntroduceContainer>
      <SloganContainer>
        <SloganMassage>“Customizable, But Easy to Use.”</SloganMassage>
        <SloganMassage style={{ fontSize: "40px" }}>
          SKKUDO는 쉽고 편리하게 동아리들을 지원합니다.
        </SloganMassage>
      </SloganContainer>
      <VisionContainer>
        <VisionMassageContainer>SKKUDO의 비전</VisionMassageContainer>
        <IconContainer>
          <MainIconContainer>
            <ImWrench size="150px" color="#0c4426"></ImWrench>
            <MainIConMassageContainer>Cusuomizable</MainIConMassageContainer>
          </MainIconContainer>
          <MainIconContainer>
            <TiGroupOutline size="150px" color="#0c4426"></TiGroupOutline>
            <MainIConMassageContainer>Communication</MainIConMassageContainer>
          </MainIconContainer>
          <MainIconContainer>
            <TbPlugConnected size="150px" color="#0c4426"></TbPlugConnected>
            <MainIConMassageContainer>Easy to Use</MainIConMassageContainer>
          </MainIconContainer>
        </IconContainer>
      </VisionContainer>
      <DistinctContainer>
        <ImageContainer>
          <img src={myeong}></img>
        </ImageContainer>
        <DistinctMassageContainer>
          <FirstMassageContainer>
            지금까지의 동아리 관리 플랫폼은 모두 동아리 관리자에게 필요한
            서비스를 충분히 제공하지 않았습니다.
            <br />
            <br />
            동아리 관리의 내용이 형식화되어 있고, 일부 기능이 빠져 있거나
            사용하기 불편했죠. 우리 모두가 만족할 수 있는 동아리 관리 플랫폼이
            존재하지 않았던 것입니다.
            <br /> 바로 SKKUDO가 등장하기 전까지는 말이죠!
          </FirstMassageContainer>
          <SecondMassageContainer>
            <br />
            SKKUDO는 동아리마다 각각의 목적에 맞춰 동아리를 관리할 수 있도록
            맞춤형 관리 서비스를 지원합니다.
            <br />
            동아리의 관리의 필수 기능인 모집 관리, 공지 관리, 일정 관리, 유저
            관리, 권한 관리에 더해 가계부와 공지 및 일정 숨김기능, 관리자가
            원하는 열을 추가하는 기능까지 모두 포함되어 있습니다.
          </SecondMassageContainer>
        </DistinctMassageContainer>
      </DistinctContainer>
      {/* <div
      style={{ height: "500px", width: "100%", backgroundColor: "" }}
      ></div> */}
    </MainContainer>
  );
}

export default AboutMainPage;
