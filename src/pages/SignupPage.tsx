import { Button, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import { Loadable } from "recoil";
import styled from "styled-components";
import { LocationType } from "../types/common";

const SignupPageContainer = styled.form`
  position: relative;
  padding-top: 150px;
  max-width: 1024px;
  width: 100%;
  background-color: #c9c5c5;
  height: 100%;
  margin: 0 auto;
`;

const SignupInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 70px;
`;
const SignupInput = styled.input`
  width: 40%;
  background-color: whitesmoke;
  height: 50px;
`;

function SignupPage() {
  const [name, setName] = useState("Name");
  const [studentID, setStudentID] = useState("학번");
  const [location, setLocation] = useState<LocationType>("인사캠");

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
    console.log("name submitted");
  };
  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event.target.value);
  };
  const handleLocationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocation(event.target.value as LocationType);
  };
  return (
    <SignupPageContainer onSubmit={handleSignupFormSubmit}>
      <SignupInputContainer>
        <TextField
          required
          sx={{ width: "40%" }}
          label="이름"
          variant="outlined"
          onChange={handleNameChange}
        />
        <TextField
          sx={{ width: "40%" }}
          label="학번"
          variant="outlined"
          required
        />
      </SignupInputContainer>
      <SignupInputContainer>
        <TextField
          required
          sx={{ width: "40%" }}
          label="아이디"
          variant="outlined"
        />
        <TextField
          sx={{ width: "40%" }}
          label="비밀번호"
          variant="outlined"
          required
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
        />
      </SignupInputContainer>
      <SignupInputContainer>
        <TextField
          required
          sx={{ width: "40%" }}
          label="이메일"
          variant="outlined"
        />
        {/* <TextField
          sx={{ width: "40%" }}
          label="학과"
          variant="outlined"
          required
        /> */}
      </SignupInputContainer>
      <Button
        sx={{ position: "absolute", right: "20px" }}
        type="submit"
        variant="outlined"
      >
        submit
      </Button>
    </SignupPageContainer>
  );
}

export default SignupPage;
