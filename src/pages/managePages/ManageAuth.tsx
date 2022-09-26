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
import { AUTH_LABEL_LIST, AUTH_LIST } from "../../constants/AuthManageContants";

export default function ManageAuth() {
  // const [auth, setAuth] = useState("회장까지");
  const [authAuth, setAuthAuth] = useState("회장까지");
  const [memberAuth, setMemberAuth] = useState("회장까지");
  const [notesAuth, setNotesAuth] = useState("회장까지");
  const [recruitAuth, setRecruitAuth] = useState("회장까지");
  const [noticeAuth, setNoticeAuth] = useState("회장까지");
  const [calendarAuth, setCalendarAuth] = useState("회장까지");

  const handleChange = (event: SelectChangeEvent, authKey: string) => {
    // setAuth(event.target.value);
    if (authKey == "auth") {
      setAuthAuth(event.target.value);
    } else if (authKey == "member") {
      setMemberAuth(event.target.value);
    } else if (authKey == "notes") {
      setNotesAuth(event.target.value);
    } else if (authKey == "recruit") {
      setRecruitAuth(event.target.value);
    } else if (authKey == "notice") {
      setNoticeAuth(event.target.value);
    } else if (authKey == "calendar") {
      setCalendarAuth(event.target.value);
    }
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
          {AUTH_LABEL_LIST.map((authItem) => (
            <ListItem
              key={authItem.key}
              sx={{ marginBottom: "50px", bgcolor: "whitesmoke" }}
              disablePadding
            >
              <ListItemButton sx={{ paddingLeft: "40px" }}>
                <ListItemText primary={authItem.label} />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">권한</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={authItem.key}
                      label={authItem.label}
                      onChange={(event) => handleChange(event, authItem.key)}
                    >
                      {/* {AUTH_LIST.map((auth, index) => (
                        <MenuItem key={auth} value={index * 10 + 10}>
                          {auth}
                        </MenuItem>
                      ))} */}
                      <MenuItem value={10}>회장까지</MenuItem>
                      <MenuItem value={20}>부회장까지</MenuItem>
                      <MenuItem value={30}>임원까지</MenuItem>
                      <MenuItem value={40}>모든 사람이</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
          {/* <ListItem
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
          </ListItem> */}
        </List>
      </Box>
    </Container>
  );
}
