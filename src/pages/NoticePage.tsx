import styled from "styled-components";
import exampleImage from "../assets/images/example.png";

const ClubHeader = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;

const ClubImage = styled.img`
  width: 345px;
  height: 300px;
  object-fit: contain;
`;

const ClubInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function NoticePage() {
  return (
    <ClubHeader>
      <ClubImage src={exampleImage} />
      <ClubInfoContainer>
        <h2>Club Name</h2>
        <h2>Role</h2>
        <h2>Num of Members</h2>
      </ClubInfoContainer>
    </ClubHeader>
  );
}

export default NoticePage;
