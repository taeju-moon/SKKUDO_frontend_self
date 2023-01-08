import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ClubType } from "../types/club";
import { getOneClub } from "../utils/fetch/fetchClub";

const ClubHeader = styled("div")({
  display: "flex",
  width: "100%",
  maxWidth: "70%",
  margin: "0 auto",
  gap: "2%",
  fontSize: "calc(10px + 1.8vw)",
  color: "#0C4426",
  borderBottom: "4px solid #0C4426",
  paddingBottom: "1%",
  marginBottom: "1%",
});

interface ClubDetailHeaderType {
  pageType: "공지사항" | "일정" | "동아리원" | "내 프로필";
}
function ClubDetailHeader({ pageType }: ClubDetailHeaderType) {
  const { clubID } = useParams();
  const { data: clubData, isLoading: isClubLoading } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );
  return (
    <ClubHeader>
      <h1>{clubData?.name}</h1>
      <h4>{pageType}</h4>
    </ClubHeader>
  );
}

export default ClubDetailHeader;
