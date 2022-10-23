import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { redirect, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import exampleImage from "../assets/images/example.png";
import { isLoggedInState } from "../atoms/loginAtom";
import { userIDState } from "../atoms/userAtom";
import { UserType } from "../types/user";
import { getOneUser, verifyUser } from "../utils/fetch";

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
  /* border-bottom: solid; */
  padding-bottom: 10px;
  margin-bottom: 50px;
`;

const ClubCardsContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  flex-wrap: wrap;
`;

function MyPage() {
  const navigate = useNavigate();
  // const userID = useRecoilValue(userIDState);
  const userID = localStorage.getItem("userID");
  console.log(userID);
  const { data, isLoading, isError } = useQuery<UserType>("getOneUser", () =>
    getOneUser(userID || "")
  );

  //need to fix
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, []);

  // const { mutate, isLoading, data, isError } = useMutation(verifyUser, {
  //   onSuccess: (data) => console.log(data),
  //   onError: (error) => console.log(error),
  // });
  // useEffect(() => {
  //   mutate();
  // }, []);
  const handleMyClubCardClick = (clubID: string) => {
    navigate(`/club/${clubID}/notice`);
  };

  return (
    <MyPageContainer>
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
                    Club Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    My Postion
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : (
            data?.registeredClubs.map((club) => (
              <Card key={club.clubId} sx={{ maxWidth: 345 }}>
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
                      user registered club
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
                  Club Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  My Postion
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ClubCardsContainer>
      </SectionContainer>
    </MyPageContainer>
  );
}

export default MyPage;
