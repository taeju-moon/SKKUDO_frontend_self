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
  padding-top: 80px;
`;

const SectionContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const Title = styled.div`
  width: 100%;
  max-width: 1024px;
  font-size: 2.5rem;

  margin-bottom: 40px;
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

  const { data: appliedClubs, isLoading: isAppliedClubsLoading } = useQuery<
    RegisteredClubType[]
  >("getAppliedClubsByID", getAppliedUserByID, {
    onSuccess: (data) => {},
    onError: (error: any) => {
      alert(error.response.data.error);
    },
  });

  useEffect(() => {
    // console.log(isLoggedIn);
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (loggedInUser) {
        setUserClubs(Object.values(loggedInUser.registeredClubs));
        // console.log(loggedInUser);
      }
    }
  }, [isLoggedIn, loggedInUser]);

  const handleMyClubCardClick = (clubID: string) => {
    navigate(`/club/${clubID}/notice`);
  };

  return (
    <MyPageContainer>
      <>
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
                    <Typography gutterBottom variant="h3" component="div">
                      소속된 동아리가 없습니다.
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
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
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="div">
                        {club.clubName}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
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
                    <Typography gutterBottom variant="h5" component="div">
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
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      ></Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            )}
          </ClubCardsContainer>
        </SectionContainer>
      </>
    </MyPageContainer>
  );
}

export default MyPage;
