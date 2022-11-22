//AboutSign Page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";
import signup from "../assets/images/sign/signup.png";
import signIn from "../assets/images/sign/signIn.png";
import logout from "../assets/images/sign/logout.png";

const AboutSignContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
`;

const SignupContainer = styled.div`
  border-top-style: solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top: 5%;
  padding-bottom: 5%;

`;


const SignupMassageContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 600px;
`
const SignupImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`
const SignInContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const SignInMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`
const SignInImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`




const LogoutContainer =styled.div`
  border-top-style:solid;
  border-width: 1px;
  border-color: #0c4426;
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const LogoutMassageContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`
const LogoutImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`

function AboutSignPage() {
  return (
    <AboutSignContainer>
      <SignupContainer>
        <SignupImageContainer>
          <img src={signup}></img>
        </SignupImageContainer>
        <SignupMassageContainer></SignupMassageContainer>
      </SignupContainer>
      <SignInContainer>
        <SignInMassageContainer></SignInMassageContainer>
        <SignInImageContainer><img src={signIn}></img></SignInImageContainer>
      </SignInContainer>
      <LogoutContainer>
        <LogoutImageContainer><img src={logout}></img></LogoutImageContainer>
        <LogoutMassageContainer></LogoutMassageContainer>
      </LogoutContainer>
    </AboutSignContainer>
  );
}

export default AboutSignPage;
