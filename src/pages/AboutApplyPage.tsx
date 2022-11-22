//AboutApplyPage Page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";
import apply1 from "../assets/images/apply/apply1.png";
import apply2 from "../assets/images/apply/apply2.png";
import applyfilter from "../assets/images/apply/applyfilter.png";
import ingclub from "../assets/images/apply/ingclub.png";

const AboutApplyPageContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
`;

const FirstApplyContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const FirstApplyMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`
const FirstApplyImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`
const SecondApplyContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const SecondApplyMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`
const SecondApplyImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`
  
const ApplyFilterContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const ApplyFilterMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`
const ApplyFilterImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`

const IngClubContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const IngClubMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`
const IngClubImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`



function AboutApplyPage() {
  return (
    <AboutApplyPageContainer>
      <FirstApplyContainer>
        <FirstApplyMassageContainer></FirstApplyMassageContainer>
        <FirstApplyImageContainer><img src={apply1}></img></FirstApplyImageContainer>
      </FirstApplyContainer>
      <SecondApplyContainer>
        <SecondApplyImageContainer><img src={apply2}></img></SecondApplyImageContainer>
        <SecondApplyMassageContainer></SecondApplyMassageContainer>
      </SecondApplyContainer>
      <ApplyFilterContainer>
        <ApplyFilterMassageContainer></ApplyFilterMassageContainer>
        <ApplyFilterImageContainer><img src={applyfilter}></img></ApplyFilterImageContainer>
      </ApplyFilterContainer>
      <IngClubContainer>
        <IngClubImageContainer><img src={ingclub}></img></IngClubImageContainer>
        <IngClubMassageContainer></IngClubMassageContainer>
      </IngClubContainer>
    </AboutApplyPageContainer>
  );
}

export default AboutApplyPage;