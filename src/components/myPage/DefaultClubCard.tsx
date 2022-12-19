import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import exampleImage from "../../assets/images/example.png";

interface DefaultClubCardType {
  text: string;
}

export default function DefaultClubCard({ text }: DefaultClubCardType) {
  return (
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
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
