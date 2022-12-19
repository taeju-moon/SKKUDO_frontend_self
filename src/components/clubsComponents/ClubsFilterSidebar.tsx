import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import Iconify from "../Iconify";
import Scrollbar from "../dashboardComponents/Scrollbar";

// ----------------------------------------------------------------------

export const FILTER_TYPE_OPTIONS = ["동아리", "학회"];
export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];
export const FILTER_RATING_OPTIONS = [
  "up4Star",
  "up3Star",
  "up2Star",
  "up1Star",
];
export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

// ----------------------------------------------------------------------

interface IClubsFilterSidebar {
  isOpenFilter: boolean;
  onOpenFilter(): void;
  onCloseFilter(): void;
}

export default function ClubsFilterSidebar({
  isOpenFilter,
  onOpenFilter,
  onCloseFilter,
}: IClubsFilterSidebar) {
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: "none", overflow: "hidden" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Type
              </Typography>
              <FormGroup>
                {FILTER_TYPE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
                  />
                ))}
              </RadioGroup>
            </div>

            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </div> */}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
