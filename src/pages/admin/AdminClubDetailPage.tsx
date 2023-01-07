import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PageTitle } from "../../components/admin/PageTitle";
import { ClubType } from "../../types/club";
import { UserType } from "../../types/user";
import { BASE_URL } from "../../utils/fetch/fetch";
import { getOneClub } from "../../utils/fetch/fetchClub";
import Sunkyun from "./../../assets/images/sunkyun.png";
import { getClubMembers } from "../../utils/fetch/fetchUser";
import { AiTwotoneSetting } from "react-icons/ai";
import { useState } from "react";

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`;
const ClubInfoContainer = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const ClubImage = styled.img`
  object-fit: cover;
  height: 400px;
  background-color: whitesmoke;
`;

const ClubInfo = styled.div`
  height: 180px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 30px;
`;

const SettingBtn = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
`;

const OptionContainer = styled.ul<{ isSettingOpen: boolean }>`
  position: absolute;
  width: 80px;
  height: 210px;
  background-color: white;
  display: ${(props) => (props.isSettingOpen ? "block" : "none")};
`;
const Option = styled.li`
  height: 70px;
  background-color: aliceblue;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

export default function AdminClubDetailPage() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const { clubID } = useParams();
  console.log(clubID);
  const { data: clubData } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || ""),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  const { data: userData } = useQuery<UserType[]>(
    "getClubMembers",
    () => getClubMembers(clubID || ""),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  const handleSettingBtnClick = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  return (
    <PageContainer>
      <PageTitle>동아리 세부사항</PageTitle>
      <SettingBtn onClick={handleSettingBtnClick}>
        <AiTwotoneSetting size="30px" />
        <OptionContainer isSettingOpen={isSettingOpen}>
          <Option>삭제</Option>
        </OptionContainer>
      </SettingBtn>
      {clubData && (
        <ClubInfoContainer>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <ClubImage
                alt="배너"
                src={clubData.image ? BASE_URL + "/" + clubData.image : Sunkyun}
              />
            </Grid>
            <Grid item container spacing={2} xs={6}>
              <Grid item xs={12}>
                <ClubInfo>{clubData.name}</ClubInfo>
              </Grid>
              <Grid item xs={12}>
                <ClubInfo>{clubData.type.name}</ClubInfo>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <ClubInfo>{clubData.location}</ClubInfo>
            </Grid>
            <Grid item xs={6}>
              <ClubInfo>{clubData.recruitType}</ClubInfo>
            </Grid>
            {userData && (
              <Grid item xs={6}>
                <ClubInfo>{`동아리원 수 : ${userData.length}`}</ClubInfo>
              </Grid>
            )}
          </Grid>
        </ClubInfoContainer>
      )}
    </PageContainer>
  );
}
