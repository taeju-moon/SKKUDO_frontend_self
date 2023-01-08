import { Card, Container } from "@mui/material";
import ClubDetailHeader from "../components/ClubDetailHeader";
import UserTable from "../components/user/UserTable";

export default function User() {
  return (
    <Container sx={{ maxWidth: "100%" }}>
      <ClubDetailHeader pageType={"동아리원"} />
      <Card
        sx={{
          margin: "0 auto",
          marginTop: "80px",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <UserTable isManage={false} />
      </Card>
    </Container>
  );
}
