import styled from "styled-components";
import makeclub from "../../assets/images/makeclub/makeclub.png";
import register from "..//../assets/images/makeclub/register.png";

const MakeClubContainer = styled.div`
  border-color: #0c4426;
  padding-top: 5%;
  padding-bottom: 5%;
`;

const MakeClubMassageContainer = styled.div`
  text-align: center;
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
`;

const MakeClubImageContainer = styled.div`
  margin-top: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterContainer = styled.div`
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top: 5%;
  padding-bottom: 5%;
`;

const RegisterMassageContainer = styled.div`
  padding-right: 20px;
  font-size: 17px;
  line-height: 25px;
  font-weight: 600;
`;

const RegisterImageContainer = styled.div`
  width: 50%;
`;

function AboutMakeClubPage() {
  return (
    <>
      <MakeClubContainer>
        <MakeClubMassageContainer>
          SKKUDO에서 동아리를 새로 생성하려면 SKKUDO 메인페이지 하단에 있는
          동아리 만들기 버튼을 클릭하시면 됩니다.
        </MakeClubMassageContainer>
        <MakeClubImageContainer>
          <img src={makeclub}></img>
        </MakeClubImageContainer>
      </MakeClubContainer>
      <RegisterContainer>
        <RegisterMassageContainer>
          신청 버튼을 누르면 새로운 동아리를 만들 수 있는 신청서가 나옵니다!
          <br />
          신청서에 자신이 만들고 싶은 동아리의 정보를 기입한 후 제출해주세요.
          <br />
          SKKUDO 관리자의 승인이 이루어지면 새로운 동아리 생성이 완료됩니다!
        </RegisterMassageContainer>
        <RegisterImageContainer>
          <img src={register}></img>
        </RegisterImageContainer>
      </RegisterContainer>
    </>
  );
}

export default AboutMakeClubPage;
