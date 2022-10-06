import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import Label from "../userComponents/Label";
import { ClubType } from "../../types/club";
import { flexbox } from "@mui/system";

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

interface IProduct {
  name: string;
  cover: string;
  status: string;
}

interface IClubCard {
  club: ClubType;
}
export default function ClubCard({ club }: IClubCard) {
  const { _id, name, location, type } = club;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === "sale" && "error") || "info"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )} */}
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
    </Card>
  );
}
