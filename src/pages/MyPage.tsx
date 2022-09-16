import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import exampleImage from "../assets/images/example.png";

const MyPageContainer = styled.div`
  padding-top: 80px;
`;

const SectionContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const Title = styled.div`
  width: 100%;
  max-width: 1024px;
  font-size: 2.5rem;
  border-bottom: solid;
  padding-bottom: 10px;
  margin-bottom: 50px;
`;

const ClubCardsContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  flex-wrap: wrap;
`;

const ClubCard = styled.div``;

function MyPage() {
  return (
    <MyPageContainer>
      <SectionContainer>
        <Title>내 동아리</Title>
        <ClubCardsContainer>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={exampleImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
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
