import { motion } from "framer-motion";
import { useEffect } from "react";
import { useMutation } from "react-query";

import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isManageState } from "../atoms/NavigatorAtom";
import { RegisterInfoType } from "../types/user";
import { registerClub } from "../utils/fetch";

const HomePageContainer = styled.div``;
const Banner = styled.div`
  padding-top: 120px;
  background-color: #aedb8d;
  width: 100%;
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
  font-size: 1rem;
  border: none;
  color: #dde143;
  font-weight: 800;
`;

interface RegisterMutateType {
  userID: string;
  registerInfo: RegisterInfoType;
}

function HomePage() {
  const navigate = useNavigate();
  const setIsManage = useSetRecoilState(isManageState);
  const { mutate: registerMutate } = useMutation(
    ({ userID, registerInfo }: RegisterMutateType) =>
      registerClub(userID, "6336bbad1c469c4e2329427e" || "", registerInfo),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  useEffect(() => {
    setIsManage(false);
    registerMutate({
      userID: "pp2lycee",
      registerInfo: {
        moreColumns: [
          {
            column: {
              key: "트랙",
              valueType: "string",
              _id: "636662dad8d4648f361d8ae7",
            },
            value: "백엔드",
          },
          {
            column: {
              key: "학점",
              valueType: "number",
              _id: "636662dad8d4648f361d8ae8",
            },
            value: "4.5",
          },
          {
            column: {
              key: "학년",
              valueType: "number",
              _id: "636662dad8d4648f361d8ae9",
            },
            value: "1",
          },
        ],
        initialRole: "회장",
      },
    });
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
        <LineOne>동아리/학회 관리를</LineOne>
        <LineTwo>손쉽게!!</LineTwo>
        <Name
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          SKKUDO
        </Name>
      </Banner>
      <ButtonsContainer>
        <MainPageBtn
          whileHover={{ scale: 1.1 }}
          onClick={() => handleMainPageBtnClick("search")}
        >
          동아리/학회 둘러보기
        </MainPageBtn>
        <MainPageBtn
          whileHover={{ scale: 1.1 }}
          onClick={() => handleMainPageBtnClick("make")}
        >
          동아리 신청하기
        </MainPageBtn>
      </ButtonsContainer>
    </HomePageContainer>
  );
}

export default HomePage;
