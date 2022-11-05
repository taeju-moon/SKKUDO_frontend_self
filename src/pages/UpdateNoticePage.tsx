import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { display, flexbox } from "@mui/system";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameState } from "../atoms/userAtom";
import { NoticeTagType } from "../types/notice";
import {
  createNotice,
  getTodoTagsByClubID,
  updateNotice,
} from "../utils/fetch";

// const Blank = styled("div")({
//   paddingTop: "120px",
// });
const AddNoticePageContainer = styled("form")({
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  paddingTop: "200px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

const TitleInput = styled("input")({
  width: "400px",
  height: "50px",
  marginBottom: "50px",
  borderRadius: "5px",
  backgroundColor: "#fff",
  border: "2px solid #0c4426",
  fontSize: "1.5rem",
});

const ContentInput = styled("textarea")({
  backgroundColor: "#fff",
  border: "2px solid #0c4426",
  fontSize: "1.2rem",
  borderRadius: "5px",
});

const ButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "right",
  marginTop: "40px",
});
const AddButton = styled(Button)({
  width: "200px",
  color: "#dde143",
  marginBottom: "40px",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let rawTags: string[] = [];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function UpdateNoticePage() {
  const localStorage = window.localStorage;
  const noticeData = JSON.parse(localStorage.getItem("noticeData") || "");
  const navigate = useNavigate();
  const { clubID, noticeID } = useParams();

  const [title, setTitle] = useState(noticeData.title);
  const [content, setContent] = useState(noticeData.content);

  const [tags, setTags] = useState<string[]>([]);
  const theme = useTheme();

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { data, isLoading } = useQuery<NoticeTagType[]>(
    "getTodoTagsByClubID",
    () => getTodoTagsByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        const temp: string[] = [];
        data.forEach((tag) => temp.push(tag.name));
        rawTags = temp;
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate } = useMutation(
    () =>
      updateNotice({
        clubId: clubID || "",
        noticeID: noticeID || "",
        writer: noticeData.writer,
        title,
        content,
        noticeTags: tags,
      }),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate(`/club/${clubID}/notice`);
        window.location.reload();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const handleNewNoticeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };
  // const { mutate } = useMutation(() => );
  return (
    <AddNoticePageContainer onSubmit={handleNewNoticeSubmit}>
      <TitleInput required value={title} onChange={handleTitleChange} />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">공지 카테고리</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tags}
          onChange={handleTagsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          sx={{ marginBottom: "40px" }}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {rawTags.map((selectedTag, idx) => (
            <MenuItem
              key={idx}
              value={selectedTag}
              style={getStyles(selectedTag, tags, theme)}
            >
              {selectedTag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ContentInput
        required
        value={content}
        rows={25}
        onChange={handleContentChange}
      />
      <ButtonContainer>
        <AddButton variant="contained" color="success" type="submit">
          공지 수정하기
        </AddButton>
      </ButtonContainer>
    </AddNoticePageContainer>
  );
}

export default UpdateNoticePage;
