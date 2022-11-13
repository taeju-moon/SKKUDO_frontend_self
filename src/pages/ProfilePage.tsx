import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInUserState } from "../atoms/userAtom";
import ClubDetailHeader from "../components/ClubDetailHeader";
import { RegisteredClubType } from "../types/user";

const ProfileContainer = styled.div``;

const Name = styled.div``;
const Role = styled.div``;

function ProfilePage() {
  const { clubID } = useParams();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const [clubProfile, setClubProfile] = useState<RegisteredClubType>();

  useEffect(() => {
    if (loggedInUser) {
      const registedClubs = new Map(
        Object.entries(loggedInUser.registeredClubs)
      );
      setClubProfile(registedClubs.get(clubID || ""));
    }
  }, [loggedInUser]);
  return (
    <>
      <ClubDetailHeader pageType="내 프로필" />
      <ProfileContainer>
        <Name>{loggedInUser?.name}</Name>
        <Role>{clubProfile?.role}</Role>
      </ProfileContainer>
    </>
  );
}

export default ProfilePage;
