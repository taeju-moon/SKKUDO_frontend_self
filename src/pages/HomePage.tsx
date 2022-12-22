import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isManageState } from "../atoms/NavigatorAtom";
import QuickLogin from "../components/mainPage/QuickLogin";
// import myeong from "../assets/images/myeong.jpeg";
// import yul from "../assets/images/yul.png";

const HomePageContainer = styled.div`
  padding-top: 7vh;
`;

const Banner = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  height: 65vh;
`;

const Phrase = styled.div`
  padding-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

// const ImgContainer = styled.img`
//   width: 25%;
//     @media screen and (max-width: 1024px){
//   width: 20%;
//   }
//   @media screen and (max-width: 768px){
//   display: none;
//   }
// `;

// const LineOne = styled.div`
//   font-size: 50px;
// `;

// const LineTwo = styled.div`
//   font-size: 60px;
// `;

const Name = styled(motion.div)`
  font-size: 7em;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 9vh;
  gap: 12vw;
`;

const MainPageBtn = styled(motion.button)`
  width: 20vw;
  height: 10vh;
  background-color: #0c4426;
  border-radius: 3vw;
  font-size: 1.2em;
  border: none;
  color: #dde143;
  font-weight: 550;
  cursor: pointer;
  @media screen and (max-width: 768px){
    font-size: 1em;
    border-radius: 8vw;
    width: 35vw;
  }
`;

function HomePage() {
  const navigate = useNavigate();
  const setIsManage = useSetRecoilState(isManageState);

  useEffect(() => {
    setIsManage(false);
  }, []);

  const handleMainPageBtnClick = (btnType: string) => {
    if (btnType === "search") {
      navigate("/clubs");
    } else if (btnType === "make") {
      navigate("/applyClub");
    } else {
      return;
    }
  };
  return (
    <HomePageContainer>
      <Banner>
        {/* <ImgContainer src={myeong} /> */}
        <Phrase>
          <Name
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            SKKUDO
          </Name>
        </Phrase>
        {/* <ImgContainer src={yul} /> */}
      </Banner>
      <ButtonsContainer>
        <MainPageBtn
          whileHover={{ scale: 1.1 }}
          onClick={() => handleMainPageBtnClick("search")}
        >
          동아리 둘러보기
        </MainPageBtn>
        <MainPageBtn
          whileHover={{ scale: 1.1 }}
          onClick={() => handleMainPageBtnClick("make")}
        >
          동아리 만들기
        </MainPageBtn>
      </ButtonsContainer>
      <QuickLogin />
    </HomePageContainer>
  );
}

export default HomePage;
