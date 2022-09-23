import { useTheme } from "@mui/material";
import { Theme } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IBanner {
  theme: Theme;
}

const Banner = styled.div`
  padding-top: 100px;
  background-color: beige;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const LineOne = styled.div`
  font-size: 4.5rem;
`;

const LineTwo = styled.div`
  font-size: 4.5rem;
`;

const Name = styled.div`
  font-size: 6.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
  gap: 80px;
`;

const MainPageBtn = styled.button`
  width: 150px;
  height: 80px;
  background-color: transparent;
  border-radius: 5px;
  font-size: 1rem;
`;

// const ButtonLink = styled(Link)`
//   text-decoration: none;
//   color: black;
//   font-size: 1rem;
//   width: 100%;
//   height: 100%;
// `;

function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleMainPageBtnClick = (btnType: string) => {
    if (btnType == "search") {
      navigate("/clubs");
    } else if (btnType == "make") {
      navigate("/about");
    } else {
      return;
    }
  };
  return (
    <>
      <Banner>
        <LineOne>동아리/학회 관리를</LineOne>
        <LineTwo>손쉽게!!</LineTwo>
        <Name>SKKUDO</Name>
      </Banner>
      <ButtonsContainer>
        <MainPageBtn onClick={() => handleMainPageBtnClick("search")}>
          동아리/학회 둘러보기
        </MainPageBtn>
        <MainPageBtn onClick={() => handleMainPageBtnClick("make")}>
          동아리 신청하기
        </MainPageBtn>
      </ButtonsContainer>
    </>
  );
}

export default HomePage;
