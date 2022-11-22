//AboutMakeClubPage Page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";
import makeclub from "../assets/images/makeclub/makeclub.png";
import register from "../assets/images/makeclub/register.png";

const AboutMakeClubPageContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
`;


const MakeClubContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const MakeClubMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`
const MakeClubImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`

const RegisterContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const RegisterMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`
const RegisterImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`


function AboutMakeClubPage() {
  return (
    <AboutMakeClubPageContainer>
      <MakeClubContainer>
        <MakeClubMassageContainer></MakeClubMassageContainer>
        <MakeClubImageContainer><img src={makeclub}></img></MakeClubImageContainer>
      </MakeClubContainer>
      <RegisterContainer>
        <RegisterImageContainer><img src={register}></img></RegisterImageContainer>
        <RegisterMassageContainer></RegisterMassageContainer>
      </RegisterContainer>
    </AboutMakeClubPageContainer>
  );
}

export default AboutMakeClubPage;