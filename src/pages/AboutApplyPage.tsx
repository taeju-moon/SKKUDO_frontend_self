import styled from "styled-components";
import apply1 from "../assets/images/apply/apply1.png";
import apply2 from "../assets/images/apply/apply2.png";

const FirstApplyContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 5%;
  padding-bottom: 5%;
`;
const FirstApplyMassageContainer = styled.div`
  font-size: 18px;
  line-height: 40px;
  font-weight: 600;
  padding-right: 20px;
  width: 50%;
`;
const FirstApplyImageContainer = styled.div`
  display: flex;
  width: 50%;
`;
const SecondApplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5%;
  padding-bottom: 5%;
`;
const SecondApplyMassageContainer = styled.div`
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 60px;
  margin-top: 40px;
`;
const SecondApplyImageContainer = styled.div`
  padding-left: 5%;
  display: flex;
`;

function AboutApplyPage() {
  return (
    <>
      <FirstApplyContainer>
        <FirstApplyMassageContainer>
          <br />
          <br />
          SKKUDO에서는 현재 SKKUDO에 등록된 다양한 동아리들을 확인할 수
          있습니다.
        </FirstApplyMassageContainer>
        <FirstApplyImageContainer>
          <img src={apply1}></img>
        </FirstApplyImageContainer>
      </FirstApplyContainer>
      <SecondApplyContainer>
        <SecondApplyMassageContainer>
          지원하고 싶은 동아리에 마우스를 올려서 "지원하기" 버튼을 눌러주세요!
        </SecondApplyMassageContainer>
        <SecondApplyImageContainer>
          <img src={apply2}></img>
        </SecondApplyImageContainer>
        <SecondApplyMassageContainer>
          그러면 위에 그림처럼 해당 동아리의 지원서가 나타납니다.
          <br /> 지원서를 동아리에 대한 자신의 열정을 마음껏 표출해주세요!
          <br /> 지원서가 성공적으로 제출되면 이제 해당 동아리 관리자의 결정을
          기다리기만 하면 됩니다!!
        </SecondApplyMassageContainer>
      </SecondApplyContainer>
    </>
  );
}

export default AboutApplyPage;
