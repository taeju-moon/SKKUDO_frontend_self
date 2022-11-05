import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { ClubType } from "../../types/club";
import { motion } from "framer-motion";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const ClubInfoContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const CardOverlay = styled(motion.div)({
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  opacity: 0,
  justifyContent: "center",
  alignItems: "center",
  zIndex: "20",
});

const ApplyBtn = styled(Button)({});
interface IClubCard {
  club: ClubType;
}

export default function ClubCard({ club }: IClubCard) {
  const { _id, name, location, type } = club;
  const navigate = useNavigate();
  const onApplyBtnClick = () => {
    navigate(`/apply/${_id}`);
  };
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ProductImgStyle alt={name} src={""} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" sx={{ width: "100%" }}>
            <ClubInfoContainer>
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: "text.disabled",
                }}
              >
                {type.name}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: "text.disabled",
                }}
              >
                {location}
              </Typography>
            </ClubInfoContainer>
            {/* &nbsp; */}
          </Typography>
        </Stack>
      </Stack>
      <CardOverlay whileHover={{ opacity: 1 }}>
        <ApplyBtn variant="contained" onClick={onApplyBtnClick}>
          지원하기
        </ApplyBtn>
      </CardOverlay>
    </Card>
  );
}
