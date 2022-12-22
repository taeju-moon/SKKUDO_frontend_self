// component

import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} width={22} height={22} />
);

const adminNavConfig = [
  {
    title: "동아리 신청서",
    path: "/admin/clubCreate",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "유저",
    path: "/admin/allUsers",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "공지",
    path: "/admin/allNotices",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "일정",
    path: "/admin/allCalendar",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "동아리",
    path: "/admin/allClubs",
    icon: getIcon("eva:lock-fill"),
  },
  // {
  //   title: "accountBook/가계부",
  //   path: "/manage/:clubID/accountBook",
  //   icon: getIcon("fa-solid:money-check-alt"),
  // },
  // {
  //   title: "Not found/",
  //   path: "/404",
  //   icon: getIcon("eva:alert-triangle-fill"),
  // },
];

export default adminNavConfig;
