import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import AdminSidebar from "../../admin/AdminSideBar";
import { isManageState } from "../../atoms/NavigatorAtom";

export default function AdminMainPage() {
  const isManage = useSetRecoilState(isManageState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    isManage(true);
  }, []);

  return (
    <>
      <AdminSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <Outlet />
    </>
  );
}
