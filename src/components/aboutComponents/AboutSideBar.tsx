import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AboutSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const MenuLink = styled(Link)`
  color: #0c4426;
  text-decoration: none;
  font-size: 30px;
`;
const MenuBtn = styled.button`
  width: 170px;
  height: 80px;
  background-color: #0c4426;
  border-radius: 5px;
  font-size: 1rem;

  border: none;
  color: #dde143;
  font-weight: 800;
`;

function AboutSideBar() {
  const navigate = useNavigate();
  const handleMainPageBtnClick = (btnType: string) => {
    if (btnType == "search") {
      navigate("/about/main");
    } else if (btnType == "make") {
      navigate("/about/useExample");
    } else {
      return;
    }
  };
  return (
    <AboutSideBarContainer>
      {/* <MenuBtn onClick={() => handleMainPageBtnClick("search")}>슬로건</MenuBtn>
      <MenuBtn onClick={() => handleMainPageBtnClick("make")}>사용방법</MenuBtn> */}
      <MenuLink to={"/about/main"}>소개</MenuLink>
      <MenuLink to={"/about/useExample"}>사용방법</MenuLink>
    </AboutSideBarContainer>
  );
}

export default AboutSideBar;
