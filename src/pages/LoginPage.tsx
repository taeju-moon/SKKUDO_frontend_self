import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState } from "../atoms/loginAtom";
import { userIDState } from "../atoms/userAtom";
import { loginFromServer } from "../utils/fetch";

const LoginPageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
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
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUserID = useSetRecoilState(userIDState);
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const { mutate, isLoading, data, isError } = useMutation(
    () => loginFromServer(ID, PW),
    {
      //need to fix
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userID", data.data.userID);
        setUserID(data.data.userID);
      },
      onError: (error) => console.log(error),
    }
  );

  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(event.target.value);
  };

  const handlePWChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPW(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(ID, PW);
    // setIsLoggedIn(true);
    mutate();
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
