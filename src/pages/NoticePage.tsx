import { Paper, Stack, styled } from "@mui/material";
import { useQuery } from "react-query";
// import styled from "styled-components"
import exampleImage from "../assets/images/example.png";
import { getAllNotices, getOneClub } from "../utils/fetch";
import { NoticeType } from "../types/notice";
import { ClubType } from "../types/club";
import { useParams } from "react-router-dom";

const ClubHeader = styled("div")({
  paddingTop: "100px",
  display: "flex",
  justifyContent: "center",
});

const ClubImage = styled("img")({
  width: "345px",
  height: "300px",
  objectFit: "contain",
});

const ClubInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
  height: "60px",
  // maxWidth: "1024px",
}));

function NoticePage() {
  const { clubID } = useParams();

  const { data: clubData, isLoading: isClubLoading } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || "")
  );
  const { data: noticeData, isLoading: isNoticeLoading } = useQuery<
    NoticeType[]
  >("getAllNotices", getAllNotices);

  // console.log(noticeData);
  return (
    <>
      <ClubHeader>
        <ClubImage src={exampleImage} />
        <ClubInfoContainer>
          <h2>{clubData?.name}</h2>
          <h2>Role</h2>
          <h2>{clubData?.location}</h2>
        </ClubInfoContainer>
      </ClubHeader>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        {isNoticeLoading ? (
          <>
            <Stack spacing={1} sx={{ width: "100%", maxWidth: "1024px" }}>
              <Stack
                sx={{ widht: "100%", justifyContent: "flex-end" }}
                spacing={2}
                direction={"row"}
              >
                <div>cate 1</div>
                <div>cate 1</div>
                <div>cate 1</div>
              </Stack>
              <Item elevation={3}>Item 1</Item>
            </Stack>
            <Stack spacing={1} sx={{ width: "100%", maxWidth: "1024px" }}>
              <Stack
                sx={{ widht: "100%", justifyContent: "flex-end" }}
                spacing={2}
                direction={"row"}
              >
                <div>cate 1</div>
                <div>cate 1</div>
                <div>cate 1</div>
              </Stack>
              <Item elevation={3}>Item 1</Item>
            </Stack>
          </>
        ) : (
          noticeData?.map((notice) => (
            <Stack
              key={notice.clubId}
              spacing={1}
              sx={{ width: "100%", maxWidth: "1024px" }}
            >
              <Stack
                sx={{ widht: "100%", justifyContent: "flex-end" }}
                spacing={2}
                direction={"row"}
              >
                <div>cate 1</div>
                <div>cate 1</div>
                <div>cate 1</div>
              </Stack>
              <Item elevation={3}>{notice.title}</Item>
            </Stack>
          ))
        )}
      </Stack>
    </>
  );
}

export default NoticePage;
