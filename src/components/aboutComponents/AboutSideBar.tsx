import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AboutSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 180px;
  height: 100%;
`;

const MenuLink = styled(Link)`
  color: #0c4426;
  text-decoration: none;
  /* text-align: center; */
  font-size: 15px;
  font-weight: 800;
`;

function AboutSideBar() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <AboutSideBarContainer>
      <List>
        <ListItemButton
          sx={{
            paddingTop: "15px",
            paddingBottom: "15px",
            borderBottom: "1px solid",
          }}
        >
          <MenuLink style={{ fontSize: "20px" }} to={"/about/main"}>
            소개
          </MenuLink>
        </ListItemButton>
        <ListItemButton onClick={handleClick} sx={{ paddingTop: "15px" }}>
          <div
            style={{
              color: "#0c4426",
              fontSize: "20px",
              fontWeight: "800",
            }}
          >
            스꾸도 사용방법
          </div>
        </ListItemButton>
        <Collapse in={open}>
          <List>
            <ListItemButton>
              <MenuLink to={"/about/sign"}>로그인/로그아웃/회원가입</MenuLink>
            </ListItemButton>
            <ListItemButton>
              <MenuLink to={"/about/apply"}>동아리 지원</MenuLink>
            </ListItemButton>
            <ListItemButton>
              <MenuLink to={"/about/makeclub"}>동아리 생성</MenuLink>
            </ListItemButton>
            <ListItemButton>
              <MenuLink to={"/about/mypage"}>개인 정보</MenuLink>
            </ListItemButton>
            <ListItemButton>
              <MenuLink to={"/about/manage"}>동아리 관리</MenuLink>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </AboutSideBarContainer>
  );
}

export default AboutSideBar;
