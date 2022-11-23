import { Button, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { LocationType } from "../types/common";
import { createUser } from "../utils/fetch";
import { NewUserType } from "../types/user";
import { useNavigate } from "react-router-dom";
import TopBlank from "../components/TopBlank";
import FormTitle from "../components/FormTitle";

const SignupPageContainer = styled.form`
  position: relative;
  padding-top: 50px;
  max-width: 1024px;
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  padding-bottom: 100px;
  margin: 0 auto;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
`;

const SignupInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 70px;
`;

function SignupPage() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState<LocationType>("인사캠");
  const [major, setMajor] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (newUser: NewUserType) => createUser(newUser),
    {
      onSuccess: (data) => {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const locationList = [
    {
      value: "인사캠",
      label: "인사캠",
    },
    {
      value: "자과캠",
      label: "자과캠",
    },
  ];

  const handleSignupFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      name,
      studentId,
      userID,
      password,
      location,
      major,
      contact: `${contact.substring(0, 3)}-${contact.substring(
        3,
        6
      )}-${contact.substring(6, 9)}`,
    });
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const handleStudentIdChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStudentId(event.target.value);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocation(event.target.value as LocationType);
  };

  const handleUserIDChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserID(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleMajorChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMajor(event.target.value);
  };

  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact(event.target.value);
  };

  return (
    <>
      <TopBlank />
      <SignupPageContainer onSubmit={handleSignupFormSubmit}>
        <FormTitle title="회원가입" />
        <SignupInputContainer>
          <TextField
            required
            sx={{ width: "40%" }}
            label="이름"
            variant="outlined"
            onChange={handleNameChange}
            value={name}
          />
          <TextField
            sx={{ width: "40%" }}
            label="학번"
            variant="outlined"
            required
            value={studentId}
            onChange={handleStudentIdChange}
          />
        </SignupInputContainer>
        <SignupInputContainer>
          <TextField
            required
            sx={{ width: "40%" }}
            label="아이디"
            variant="outlined"
            value={userID}
            onChange={handleUserIDChange}
            inputProps={{ minLength: 5 }}
          />
          <TextField
            sx={{ width: "40%" }}
            label="비밀번호"
            variant="outlined"
            required
            value={password}
            onChange={handlePasswordChange}
            inputProps={{ minLength: 5 }}
          />
        </SignupInputContainer>
        <SignupInputContainer>
          <TextField
            select
            required
            sx={{ width: "40%" }}
            label="지역"
            variant="outlined"
            value={location}
            onChange={handleLocationChange}
          >
            {locationList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ width: "40%" }}
            label="학과"
            variant="outlined"
            required
            value={major}
            onChange={handleMajorChange}
          />
        </SignupInputContainer>
        <SignupInputContainer>
          <TextField
            sx={{ width: "40%" }}
            label="연락처(숫자만 적어주세요)"
            variant="outlined"
            required
            value={contact}
            onChange={handleContactChange}
            type="number"
          />
        </SignupInputContainer>
        <Button
          sx={{ position: "absolute", right: "40px", fontSize: "18px" }}
          type="submit"
          variant="outlined"
          color="success"
        >
          submit
        </Button>
      </SignupPageContainer>
    </>
  );
}

export default SignupPage;
