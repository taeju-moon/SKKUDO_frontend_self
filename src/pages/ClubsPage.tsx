import { Container, Stack, Typography } from "@mui/material";

import { useState } from "react";
import ClubsFilterSidebar from "../components/clubsComponents/ClubsFilterSidebar";
import ClubsList from "../components/clubsComponents/ClubsList";

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
      <Typography variant="h4" sx={{ mb: 5 }}>
        모집중인 동아리
      </Typography>
      <ClubsList products={PRODUCTS} />
      <Typography variant="h4" sx={{ mb: 5 }}>
        모집중인 동아리
      </Typography>
      <ClubsList products={PRODUCTS} />
    </Container>
  );
}

export default ClubsPage;
