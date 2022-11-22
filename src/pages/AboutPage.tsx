import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";

const AboutContainer = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  max-width: 1200px;
  padding-top: 150px;
  min-height: 100%;
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
