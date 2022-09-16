import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginPageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 3rem;
  margin-bottom: 25px;
`;

const LoginForm = styled.form`
  display: flex;
  gap: 20px;
`;

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginInput = styled.input``;

const LoginButton = styled.button``;

function LoginPage() {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(event.target.value);
  };

  const handlePWChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPW(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(ID, PW);
    navigate("/myPage");
  };

  return (
    <LoginPageContainer>
      <Title>SKKUDO</Title>
      <LoginForm onSubmit={handleSubmit}>
        <LoginInputContainer>
          <LoginInput onChange={handleIDChange}></LoginInput>
          <LoginInput type="password" onChange={handlePWChange}></LoginInput>
        </LoginInputContainer>
        <LoginButton type="submit">Log In</LoginButton>
      </LoginForm>
    </LoginPageContainer>
  );
}

export default LoginPage;
