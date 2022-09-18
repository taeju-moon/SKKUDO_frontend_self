import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import ClubDetailNavigator from "./ClubDetailNavigator";

const NavigatorContainer = styled.header`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: whitesmoke;
`;

const ItemsContainer = styled.div`
  margin: 0 auto;
  /* background-color: bisque; */
  display: flex;
  height: 100%;
  max-width: 1400px;
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 200px;
  /* background-color: aliceblue; */
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  color: black;
  font-size: 3rem;
`;

const NavigationContainer = styled.nav`
  margin-left: 40px;
`;

const NavigationUl = styled.ul`
  display: flex;
  height: 100%;
  gap: 40px;
`;

const NavigationLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 2rem;
`;

const LoginBtn = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  margin-left: auto;
  margin-right: 20px;
`;

interface ILoginOptionContainer {
  isLoginOptionOpened: boolean;
}
const LoginOptionContainer = styled.ul<ILoginOptionContainer>`
  position: absolute;
  width: 100px;
  background-color: aliceblue;
  right: 0;
  border-radius: 5px;
  display: ${(props) => (props.isLoginOptionOpened ? "block" : "none")};
`;

const LoginOption = styled.li`
  text-align: start;
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 1.3rem;
  padding-top: 20px;
`;

const LoginLink = styled(Link)`
  text-decoration: none;
`;

function Navigator() {
  const [isLoginOptionOpened, setIsLoginOptionOpened] = useState(false);
  const handleLoginBtnClick = () => {
    setIsLoginOptionOpened((prev) => !prev);
  };
  return (
    <NavigatorContainer>
      <ItemsContainer>
        <LogoContainer to="/">
          <Logo>SKKUDO</Logo>
        </LogoContainer>
        <NavigationContainer>
          <NavigationUl>
            <NavigationLi>
              <NavigationLink to="/clubs">Club</NavigationLink>
            </NavigationLi>
            <NavigationLi>
              <NavigationLink to="/about">About</NavigationLink>
            </NavigationLi>
            <NavigationLi>
              <NavigationLink to="/myPage">My Page</NavigationLink>
            </NavigationLi>
          </NavigationUl>
        </NavigationContainer>
        <LoginBtn onClick={handleLoginBtnClick}>
          <IoPersonOutline size="2.3rem" />
          <LoginOptionContainer isLoginOptionOpened={isLoginOptionOpened}>
            <LoginOption>
              <LoginLink to="/login">로그인</LoginLink>
            </LoginOption>
            <LoginOption>
              <LoginLink to="/signup">회원가입</LoginLink>
            </LoginOption>
          </LoginOptionContainer>
        </LoginBtn>
      </ItemsContainer>
    </NavigatorContainer>
  );
}

export default Navigator;
