import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { UserType } from "../types/user";
import { getClubMembers } from "../utils/fetch";
import ClubDetailHeader from "../components/ClubDetailHeader";

function BasicTable() {
  const { clubID } = useParams();

  const { data, isLoading } = useQuery<UserType[]>(
    "getClubMembers",
    () => getClubMembers(clubID || ""),
    {
      onError: (error: any) => alert(error.response.data.error),
    }
  );
  return (
    <TableContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        border: "none",
        boxShadow: "none",
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
        marginTop: "80px",
      }}
      component={Paper}
    >
      <Table sx={{ maxWidth: 1024, width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "25px" }}>이름</TableCell>
            <TableCell sx={{ fontSize: "25px" }} align="right">
              학번
            </TableCell>
            <TableCell sx={{ fontSize: "25px" }} align="right">
              권한
            </TableCell>
            <TableCell sx={{ fontSize: "25px" }} align="right">
              학과
            </TableCell>
            <TableCell sx={{ fontSize: "25px" }} align="right">
              학교
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <div>동아리 멤버가 존재하지 않거나 볼 수 있는 권한이 없습니다</div>
          ) : (
            data?.map((member) => (
              <TableRow key={member._id}>
                <TableCell sx={{ fontSize: "23px" }} component="th" scope="row">
                  {member.name}
                </TableCell>
                <TableCell sx={{ fontSize: "23px" }} align="right">
                  {member.studentId}
                </TableCell>
                <TableCell sx={{ fontSize: "23px" }} align="right">
                  {
                    Object.values(member.registeredClubs).filter(
                      (club) => club.clubId === clubID
                    )[0].role
                  }
                </TableCell>
                <TableCell sx={{ fontSize: "23px" }} align="right">
                  {member.major}
                </TableCell>
                <TableCell sx={{ fontSize: "23px" }} align="right">
                  {member.location}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const MembersPageContainer = styled.div``;
function MembersPage() {
  return (
    <MembersPageContainer>
      <ClubDetailHeader pageType="동아리원" />
      <BasicTable />
    </MembersPageContainer>
  );
}

export default MembersPage;
