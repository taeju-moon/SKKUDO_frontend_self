import { Container, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import ClubsFilterSidebar from "../components/clubsComponents/ClubsFilterSidebar";
import ClubsList from "../components/clubsComponents/ClubsList";
import { ClubType } from "../types/club";
import { getAllClubs } from "../utils/fetch";

function ClubsPage() {
  const { data, isLoading } = useQuery<ClubType[]>("getAllClubs", getAllClubs);

  const filterRecruitingClubs = (allClubs: ClubType[] | undefined) => {
    if (typeof allClubs === "undefined") {
      return null;
    } else {
      const today = moment(new Date()).format("YYYY-MM-DD");
      const recruitingClubs = allClubs.filter((club) => {
        if (club.recruitType === "상시모집") {
          return true;
        } else {
          return (
            today >= club.recruitStart!.substring(0, 10) &&
            today <= club.recruitEnd!.substring(0, 10)
          );
        }
      });
      return recruitingClubs;
    }
  };

  const recruitingClubs = filterRecruitingClubs(data);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container sx={{ paddingTop: "80px" }}>
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
          <Typography variant="h3" sx={{ mb: 5 }}>
            모든 동아리/학회
          </Typography>

          <ClubsList clubs={isLoading ? [] : data!} />
        </div>
        <div>
          <Typography variant="h3" sx={{ mb: 5, marginTop: "40px" }}>
            모집중인 동아리/학회
          </Typography>
          {recruitingClubs ? <ClubsList clubs={recruitingClubs} /> : null}
        </div>
      </Stack>
    </Container>
  );
}

export default ClubsPage;
