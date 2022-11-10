import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import exampleImage from "../assets/images/example.png";

import { RegisteredClubType, VerifyUserResponseType } from "../types/user";
import { getAppliedUserByID, verifyUser } from "../utils/fetch";

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
  max-width: 1150px;
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
`;

function MyPage() {
  const navigate = useNavigate();
  const [userClubs, setUserClubs] = useState<RegisteredClubType[]>();

  const { data: appliedClubs, isLoading: isAppliedClubsLoading } = useQuery<
    RegisteredClubType[]
  >("getAppliedClubsByID", getAppliedUserByID, {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const { mutate, data, isLoading } = useMutation<VerifyUserResponseType>(
    verifyUser,
    {
      onSuccess: (data) => {
        setUserClubs(Object.values(data.authUser.registeredClubs));
        console.log(data);
      },
      onError: (error) => navigate("/login"),
    }
  );

  // const cookie = useCookies(["x_auth"]);

  useEffect(() => {
    mutate();
  }, []);

  // console.log(userClubs);

  const handleMyClubCardClick = (clubID: string) => {
    navigate(`/club/${clubID}/notice`);
  };

  return (
    <MyPageContainer>
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <SectionContainer>
            <Title>내 동아리</Title>
            <ClubCardsContainer>
              {isLoading ? (
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
                      <Typography gutterBottom variant="h5" component="div">
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
                        <Typography gutterBottom variant="h5" component="div">
                          {club.clubName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
              {isAppliedClubsLoading ? (
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
      )}
    </MyPageContainer>
  );
}

export default MyPage;
