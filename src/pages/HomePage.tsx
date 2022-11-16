import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isManageState } from "../atoms/NavigatorAtom";
import myeong from "../assets/images/myeong.jpeg";
import yul from "../assets/images/yul.png";

const HomePageContainer = styled.div`
  padding-top: 80px;
`;
const Banner = styled.div`
  display: flex;
  background-color: white;
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

const ImgContainer = styled.img``;

const LineOne = styled.div`
  font-size: 4.5rem;
  /* font-family: ; */
`;

const LineTwo = styled.div`
  font-size: 4.5rem;
`;

const Name = styled(motion.div)`
  font-size: 6.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
  gap: 80px;
`;

const MainPageBtn = styled(motion.button)`
  width: 170px;
  height: 80px;
  background-color: #0c4426;
  border-radius: 5px;
  font-size: 28px;
  border: none;
  color: #dde143;
  font-weight: 800;
`;

function HomePage() {
  const navigate = useNavigate();
  const setIsManage = useSetRecoilState(isManageState);

  useEffect(() => {
    setIsManage(false);
  }, []);

  const handleMainPageBtnClick = (btnType: string) => {
    if (btnType == "search") {
      navigate("/clubs");
    } else if (btnType == "make") {
      navigate("/applyClub");
    } else {
      return;
    }
  };
  return (
    <HomePageContainer>
      <Banner>
        <ImgContainer src={myeong} />
        <Phrase>
          <LineOne>동아리/학회 관리를</LineOne>
          <LineTwo>손쉽게!!</LineTwo>
          <Name
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            SKKUDO
          </Name>
        </Phrase>
        <ImgContainer src={yul} />
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
    </HomePageContainer>
  );
}

export default HomePage;
