// component
import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} width={22} height={22} />
);

const navConfig = [
  {
    title: "dashboard/메인화면",
    path: "/manage/1398/main",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user/멤버관리",
    path: "/manage/1398/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "product/회의록",
    path: "/manage/1398/notes",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "blog/권한관리",
    path: "/manage/1398/auth",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "login/모집관리",
    path: "/manage/1398/recruit",
    icon: getIcon("eva:lock-fill"),
  },
  {
    title: "Not found/",
    path: "/404",
    icon: getIcon("eva:alert-triangle-fill"),
  },
];

export default navConfig;
