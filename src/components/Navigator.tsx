import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoPersonOutline } from "react-icons/io5";

const NavigatorContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: whitesmoke;
`;

const ItemsContainer = styled.div`
  margin: 0 auto;
  /* background-color: bisque; */
  display: flex;
  height: 100%;
  max-width: 1200px;
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
  border: none;
  background-color: transparent;
  margin-left: auto;
`;

function Navigator() {
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
        <LoginBtn>
          <IoPersonOutline size="2.3rem" />
        </LoginBtn>
      </ItemsContainer>
    </NavigatorContainer>
  );
}

export default Navigator;
