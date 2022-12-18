import { Card, Container } from "@mui/material";
import ClubDetailHeader from "../components/ClubDetailHeader";
import UserTable from "../components/user/UserTable";

export default function User() {
  return (
    <Container sx={{ maxWidth: "1024px" }}>
      <ClubDetailHeader pageType={"동아리원"} />
      <Card
        sx={{
          margin: "0 auto",
          marginTop: "80px",
          width: "100%",
          maxWidth: "1024px",
        }}
      >
        <UserTable isManage={false} />
      </Card>
    </Container>
  );
}
