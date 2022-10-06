import { Button, MenuItem, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import { RecruitType } from "../types/club";
import { LocationType } from "../types/common";

const ApplyClubPageContainer = styled("form")({
  paddingTop: "200px",
  width: "100%",
  maxWidth: "1024px",
  backgroundColor: "beige",
  margin: "0 auto",
});

const ApplyInputContainer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-evenly",
  marginBottom: "70px",
});

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

const recruitTypeList = [
  {
    value: "상시모집",
    label: "상시모집",
  },
  {
    value: "정규모집",
    label: "정규모집",
  },
];

function ApplyClubPage() {
  const [clubName, setClubName] = useState("동아리 이름");
  const [location, setLocation] = useState<LocationType>("인사캠");
  const [recruitType, setRecruitType] = useState<RecruitType>("상시모집");

  const handleApplyClubSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("club applied");
  };

  const handleClubNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setClubName(event.target.value);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocation(event.target.value as LocationType);
  };

  const handleRecruitTypeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRecruitType(event.target.value as RecruitType);
  };

  return (
    <ApplyClubPageContainer onSubmit={handleApplyClubSubmit}>
      <ApplyInputContainer>
        <TextField
          required
          sx={{ width: "40%" }}
          label="동아리 이름"
          variant="outlined"
          onChange={handleClubNameChange}
        />
        <TextField
          sx={{ width: "40%" }}
          label="동아리 주제"
          variant="outlined"
          required
        />
      </ApplyInputContainer>
      <ApplyInputContainer>
        <TextField
          select
          required
          sx={{ width: "40%" }}
          label="동아리 모집 방식"
          variant="outlined"
          value={recruitType}
          onChange={handleRecruitTypeChange}
        >
          {recruitTypeList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
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
      </ApplyInputContainer>
      {/* <ApplyInputContainer>
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
        </TextField> */}
      {/* <TextField
          sx={{ width: "40%" }}
          label="학과"
          variant="outlined"
          required
        />
      </ApplyInputContainer>
      <ApplyInputContainer>
        <TextField
          required
          sx={{ width: "40%" }}
          label="이메일"
          variant="outlined"
        /> */}
      {/* <TextField
          sx={{ width: "40%" }}
          label="학과"
          variant="outlined"
          required
        /> */}
      {/* </ApplyInputContainer> */}
      <Button
        sx={{ position: "absolute", right: "20px" }}
        type="submit"
        variant="outlined"
      >
        submit
      </Button>
    </ApplyClubPageContainer>
  );
}

export default ApplyClubPage;
