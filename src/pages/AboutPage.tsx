import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AboutSideBar from "../components/about/AboutSideBar";

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

const ContentContainer = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  flex-direction: column;
  overflow-x: visible;
`;

function AboutPage() {
  return (
    <AboutContainer>
      <AboutSideBar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </AboutContainer>
  );
}

export default AboutPage;
