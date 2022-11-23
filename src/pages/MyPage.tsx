import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import exampleImage from "../assets/images/example.png";
import { RegisteredClubType } from "../types/user";
import { getAppliedUserByID } from "../utils/fetch";
import { isLoggedInState } from "../atoms/loginAtom";
import { loggedInUserState } from "../atoms/userAtom";

const MyPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  padding-top: 80px;
`;

const InfoContainer = styled.div`
  background-color: #0c4426;
  border-radius: 10px;
  width: 100%;
  margin-top: 100px;
  padding: 20px;
  color: #dde143;
  padding-left: 40px;
  border: 2px solid;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const RowContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-end;
  margin-bottom: 30px;
`;

const Name = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

const Major = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

const StudentID = styled.div`
  font-size: 25px;
  margin-bottom: 30px;
  font-weight: 600;
`;

const Location = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const SectionContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  max-width: 1024px;
  font-size: 35px;
  color: #0c4426;
  margin-bottom: 30px;
  font-weight: 600;
  padding-left: 10px;
`;

const ClubCardsContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
`;

function MyPage() {
  const navigate = useNavigate();
  const [userClubs, setUserClubs] = useState<RegisteredClubType[]>([]);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const loggedInUser = useRecoilValue(loggedInUserState);

  // console.log(loggedInUser);

  const { data: appliedClubs } = useQuery<RegisteredClubType[]>(
    "getAppliedClubsByID",
    getAppliedUserByID,
    {
      onSuccess: (data) => {},
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (loggedInUser) {
        setUserClubs(Object.values(loggedInUser.registeredClubs));
      }
    }
  }, [isLoggedIn, loggedInUser]);

  // console.log(userClubs);

  const handleMyClubCardClick = (clubID: string) => {
    navigate(`/club/${clubID}/notice`);
  };

  return (
    <MyPageContainer>
      <InfoContainer>
        {loggedInUser ? (
          <>
            <RowContainer>
              <Name>{loggedInUser.name}</Name>
              <Major>{loggedInUser.major}</Major>
            </RowContainer>
            <StudentID>{`학번 : ${loggedInUser.studentId}`}</StudentID>
            <Location>{`소속 : ${loggedInUser.location}`}</Location>
          </>
        ) : (
          <RowContainer>
            정보를 불러오지 못했습니다. 다시 로그인 해주세요
          </RowContainer>
        )}
      </InfoContainer>
      <SectionContainer>
        <Title>내 동아리</Title>
        <ClubCardsContainer>
          {userClubs.length === 0 ? (
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={exampleImage}
                  alt="green iguana"
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    소속된 동아리가 없습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : (
            userClubs?.map((club) => (
              <Card key={club.clubId} sx={{ width: 345 }}>
                <CardActionArea
                  onClick={() => handleMyClubCardClick(club.clubId)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={exampleImage}
                    alt="green iguana"
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "20px",
                    }}
                  >
                    <Typography variant="h5" component="div">
                      {club.clubName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {club.role}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </ClubCardsContainer>
      </SectionContainer>

      <SectionContainer>
        <Title>지원중인 동아리</Title>
        <ClubCardsContainer>
          {appliedClubs && appliedClubs.length === 0 ? (
            <Card sx={{ width: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={exampleImage}
                  alt="green iguana"
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    지원한 동아리가 없습니다.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : (
            appliedClubs?.map((club) => (
              <Card key={club.clubId} sx={{ width: 345 }}>
                <CardActionArea
                // onClick={() => handleMyClubCardClick(club.clubId)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={exampleImage}
                    alt="green iguana"
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {club.clubName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </ClubCardsContainer>
      </SectionContainer>
    </MyPageContainer>
  );
}

export default MyPage;
