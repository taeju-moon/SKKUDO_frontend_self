// icons
import { Icon, IconifyIcon } from "@iconify/react";
// @mui
import { Box } from "@mui/material";

interface IIconify {
  icon: string | IconifyIcon;
  sx?: object;
  [x: string]: any;
}
export default function Iconify({ icon, sx, ...other }: IIconify) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
