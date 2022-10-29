import { Link as RouterLink, useParams } from "react-router-dom";
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
import { RoleType } from "../../types/common";
import { useQuery } from "react-query";
import { ValidationType } from "../../types/validation";
import { getValidatonByClubID } from "../../utils/fetch";

export default function ManageAuth() {
  // const [auth, setAuth] = useState("회장까지");
  const [authAuth, setAuthAuth] = useState<string>("회장");
  const [memberAuth, setMemberAuth] = useState("회장");
  const [notesAuth, setNotesAuth] = useState("회장");
  const [recruitAuth, setRecruitAuth] = useState("회장");
  const [noticeAuth, setNoticeAuth] = useState("회장");
  const [calendarAuth, setCalendarAuth] = useState("회장");
  const { clubID } = useParams();
  const { data, isLoading } = useQuery<ValidationType>(
    "getValidationByClubID",
    () => getValidatonByClubID(clubID || "")
  );

  const returnSelectValue = (authKey: string) => {
    if (authKey == "auth") {
      return authAuth;
    } else if (authKey == "member") {
      return memberAuth;
    } else if (authKey == "notes") {
      return notesAuth;
    } else if (authKey == "recruit") {
      return recruitAuth;
    } else if (authKey == "notice") {
      return noticeAuth;
    } else {
      return calendarAuth;
    }
  };

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
          {AUTH_LABEL_LIST.map((ele) => (
            <ListItem
              key={ele.key}
              sx={{ marginBottom: "50px", bgcolor: "whitesmoke" }}
              disablePadding
            >
              <ListItemButton sx={{ paddingLeft: "40px" }}>
                <ListItemText primary={ele.label} />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">권한</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={returnSelectValue(ele.key)}
                      label="권한"
                      onChange={(event) => handleChange(event, ele.key)}
                    >
                      <MenuItem value={"회장"}>회장까지</MenuItem>
                      <MenuItem value={"부회장"}>부회장까지</MenuItem>
                      <MenuItem value={"운영진"}>운영진까지</MenuItem>
                      <MenuItem value={"부원"}>모든 사람이</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
