import { useQuery } from "react-query";
import styled from "styled-components";
import { getAllUsers } from "../../utils/fetch/fetchUser";

const Title = styled.div``;

export default function AllUsersPage() {
  const { data } = useQuery("getAllUsers", getAllUsers, {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
  return <Title>전체 유저</Title>;
}
