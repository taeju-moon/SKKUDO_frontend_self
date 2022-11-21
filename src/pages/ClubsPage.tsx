import { Container, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import ClubsFilterSidebar from "../components/clubsComponents/ClubsFilterSidebar";
import ClubsList from "../components/clubsComponents/ClubsList";
import FilterTag from "../components/FilterTag";
import { ClubType, ClubTypeType } from "../types/club";
import { getAllClubs, getAllClubTypes } from "../utils/fetch";

interface TagType {
  _id: string;
  name: string;
  clubId: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

function ClubsPage() {
  const { data, isLoading } = useQuery<ClubType[]>("getAllClubs", getAllClubs, {
    onSuccess(data) {
      setItems(data);
    },
  });

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

  const [items, setItems] = useState<ClubType[] | undefined>(data);

  const recruitingClubs = filterRecruitingClubs(items);

  // const [tags, setTags] = useState<TagType[]>([]);

  // useEffect(() => {
  //   getAllClubTypes()
  //     .then((data) => {
  //       setTags(data.data.data as TagType[]);
  //     })
  //     .catch(() => alert("알 수 없는 오류가 났습니다."));
  // }, []);
  const { data: tags } = useQuery<TagType[]>(
    "getAllClubTypes",
    getAllClubTypes,
    {
      onError: (error: any) => alert(error.response.data.error),
    }
  );
  return (
    <Container sx={{ paddingTop: "80px" }}>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5, margin: 0, marginTop: "40px" }}
      >
        <FilterTag
          isClub={true}
          tags={tags || []}
          usingItems={data as ClubType[]}
          setItems={setItems}
        />
      </Stack>

      <Stack divider={<Divider />}>
        <div>
          <Typography variant="h3" sx={{ mb: 5 }}>
            모든 동아리/학회
          </Typography>

          <ClubsList clubs={isLoading ? [] : items!} />
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
