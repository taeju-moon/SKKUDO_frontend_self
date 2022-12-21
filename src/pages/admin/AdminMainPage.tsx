import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../admin/AdminSideBar";

export default function AdminMainPage() {
  const [open, setOpen] = useState(false);
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
