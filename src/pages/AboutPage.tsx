import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";

const AboutContainer = styled.div`
  display: flex;
  background-color: beige;
  width: 100%;
  max-width: 1024px;
  padding-top: 300px;
  /* justify-content: center; */
  margin: 0 auto;
  position: relative;
`;
function AboutPage() {
  return (
    <AboutContainer>
      <AboutSideBar />
      <Outlet />
    </AboutContainer>
  );
}

export default AboutPage;
