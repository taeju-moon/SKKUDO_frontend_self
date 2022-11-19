import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ClubType } from "../types/club";
import { getOneClub } from "../utils/fetch";

const ClubHeader = styled("div")({
  paddingTop: "10px",
  display: "flex",
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  gap: "30px",
  fontSize: "50px",
  color: "#0C4426",
  borderBottom: "4px solid #0C4426",
  paddingBottom: "15px",
});

interface ClubDetailHeaderType {
  pageType: "공지사항" | "일정" | "동아리원" | "내 프로필";
}
function ClubDetailHeader({ pageType }: ClubDetailHeaderType) {
  const { clubID } = useParams();
  const { data: clubData, isLoading: isClubLoading } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || ""),
    { onSuccess: (data) => console.log(data) }
  );
  return (
    <ClubHeader>
      <h1>
        {clubData?.name}| {pageType}
      </h1>
    </ClubHeader>
  );
}

export default ClubDetailHeader;
