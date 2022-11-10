import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ClubType } from "../../types/club";
import { getOneClub } from "../../utils/fetch";

const ClubTitle = styled.div``;
const ClubTheme = styled.div``;
const ClubLocation = styled.div``;
const ClubRecruitType = styled.div``;
const ClubRecruitStart = styled.div``;
const ClubRecruitEnd = styled.div``;

function ManageClub() {
  const { clubID } = useParams();
  const { data: clubData } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || ""),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );
  return <div></div>;
}

export default ManageClub;
