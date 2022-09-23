import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
// material
import {
  Container,
  Stack,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
// components
// mock

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ManageAuth() {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          "동아리 이름" 권한 관리
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          maxWidth: 1024,
          bgcolor: "background.paper",
          padding: "20px",
        }}
      >
        <List>
          <ListItem
            sx={{ marginBottom: "50px", bgcolor: "whitesmoke" }}
            disablePadding
          >
            <ListItemButton sx={{ paddingLeft: "40px" }}>
              <ListItemText primary="권한 관리기능 권한 설정" />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>회장까지</MenuItem>
                    <MenuItem value={20}>부회장까지</MenuItem>
                    <MenuItem value={30}>임원까지</MenuItem>
                    <MenuItem value={40}>모든 사람이</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{ marginBottom: "50px", bgcolor: "whitesmoke" }}
            disablePadding
          >
            <ListItemButton sx={{ paddingLeft: "40px" }}>
              <ListItemText primary="권한 관리기능 권한 설정" />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>회장까지</MenuItem>
                    <MenuItem value={20}>부회장까지</MenuItem>
                    <MenuItem value={30}>임원까지</MenuItem>
                    <MenuItem value={40}>모든 사람이</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
