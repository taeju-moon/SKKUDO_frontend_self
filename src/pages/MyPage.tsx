import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import exampleImage from "../assets/images/example.png";

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

  const handleMyClubCardClick = () => {
    navigate("/club/1398/notice");
  };

  return (
    <MyPageContainer>
      <SectionContainer>
        <Title>내 동아리</Title>
        <ClubCardsContainer>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleMyClubCardClick}>
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
