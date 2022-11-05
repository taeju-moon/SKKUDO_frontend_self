import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AppliedUserType } from "../../types/apply";
import { getAppliedUserByClubID } from "../../utils/fetch";

function ManageRecruit() {
  const { clubID } = useParams();

  const { data, isLoading } = useQuery<AppliedUserType[]>(
    "getAppliedUserByClubID",
    () => getAppliedUserByClubID(clubID || ""),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  return <div>Manage Recruit</div>;
}

export default ManageRecruit;
