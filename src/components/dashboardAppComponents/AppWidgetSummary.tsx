// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Theme, Typography } from "@mui/material";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";
import Iconify from "../Iconify";
// components
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

type colorType =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

interface AppWidgetSummaryType {
  title: string;
  total: number | string;
  icon: string;
  color?: colorType;
  sx?: object;
  [x: string]: any;
}
export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}: AppWidgetSummaryType) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: (theme: Theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme: Theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h3">{total}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
