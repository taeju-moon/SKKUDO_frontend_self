import { Container, Divider, Stack, Typography } from "@mui/material";

import { useState } from "react";
import ClubsFilterSidebar from "../components/clubsComponents/ClubsFilterSidebar";
import ClubsList from "../components/clubsComponents/ClubsList";
import { ClubType } from "../types/club";

const ALL_CLUBS_LIST: ClubType[] = [
  {
    _id: "1",
    name: "billboard",
    location: "자과캠",
    type: {
      _id: "1",
      name: "보드게임",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userColumns: [
      {
        _id: "1",
        key: "newKey",
        valueType: "string",
      },
    ],
    recruitType: "정규모집",
    recruitStart: null,
    recruitEnd: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    name: "hakhae",
    location: "인사캠",
    type: {
      _id: "2",
      name: "수학",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userColumns: [
      {
        _id: "1",
        key: "newKey",
        valueType: "string",
      },
    ],
    recruitType: "상시모집",
    recruitStart: null,
    recruitEnd: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const RECRUITING_CLUBS_LIST: ClubType[] = [
  {
    _id: "2",
    name: "hakhae",
    location: "인사캠",
    type: {
      _id: "2",
      name: "수학",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userColumns: [
      {
        _id: "1",
        key: "newKey",
        valueType: "string",
      },
    ],
    recruitType: "상시모집",
    recruitStart: null,
    recruitEnd: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const PRODUCTS = [
  {
    id: 1,
    cover: "",
    name: "first",
    status: "sale",
  },
  {
    id: 2,
    cover: "",
    name: "second",
    status: "new",
  },
];

function ClubsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container sx={{ paddingTop: "80px" }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Notes
      </Typography>

      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ClubsFilterSidebar
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
        </Stack>
      </Stack>
      <Stack divider={<Divider />}>
        <div>
          <Typography variant="h4" sx={{ mb: 5 }}>
            모집중인 동아리/학회
          </Typography>
          <ClubsList products={PRODUCTS} />
        </div>
        <div>
          <Typography variant="h4" sx={{ mb: 5 }}>
            모든 동아리/학회
          </Typography>
          <ClubsList products={PRODUCTS} />
        </div>
      </Stack>
    </Container>
  );
}

export default ClubsPage;
