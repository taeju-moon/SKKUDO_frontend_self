import styled from "styled-components";

const MyPageContainer = styled.div`
  padding-top: 80px;
`;

const SectionContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  max-width: 1024px;
  font-size: 2.5rem;
`;

const ClubCardsContainer = styled.div`
  flex-wrap: wrap;
`;

const ClubCard = styled.div``;

function MyPage() {
  return (
    <MyPageContainer>
      <SectionContainer>
        <Title>내 동아리</Title>
        <ClubCardsContainer></ClubCardsContainer>
      </SectionContainer>
    </MyPageContainer>
  );
}

export default MyPage;
