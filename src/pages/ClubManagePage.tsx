import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isManageState } from "../atoms/NavigatorAtom";

function ClubManagePage() {
  const setIsManage = useSetRecoilState(isManageState);
  useEffect(() => {
    setIsManage(true);
  }, []);
  return <div>manage</div>;
}
export default ClubManagePage;
