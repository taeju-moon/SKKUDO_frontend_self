import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigatorContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: beige;
`;

const ItemsContainer = styled.div`
  margin: 0 auto;
  background-color: bisque;
  display: flex;
  height: 100%;
  max-width: 1200px;
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 200px;
  background-color: aliceblue;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  color: blueviolet;
  font-size: 3rem;
`;

function Navigator() {
  return (
    <NavigatorContainer>
      <ItemsContainer>
        <LogoContainer to="/">
          <Logo>SKKUDO</Logo>
        </LogoContainer>
      </ItemsContainer>
    </NavigatorContainer>
  );
}

export default Navigator;
