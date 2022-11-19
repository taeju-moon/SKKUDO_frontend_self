import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import styled from "@emotion/styled";
import {
  Box,
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
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  createTodo,
  getClubMembers,
  getTodoTagsByClubID,
  updateTodo,
} from "../../utils/fetch";
import { UserType } from "../../types/user";
import { NewToDoType, ToDoTagType, UpdateTodoType } from "../../types/todo";
import { TimePicker } from "@mui/x-date-pickers";
import { useRecoilValue } from "recoil";
import {
  isTodoUpdateState,
  updateTodoInfoState,
} from "../../atoms/calendarAtom";

const NewTodoForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const NewTodoInput = styled(TextField)`
  width: 400px;
  margin-bottom: 40px;
`;

const NewTodoSumbitBtn = styled(Button)`
  font-size: 20px;
`;

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

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

let names: string[] = [];

let rawTags: string[] = [];

function TodoAddDialog(props: SimpleDialogProps) {
  const { clubID } = useParams();
  const isTodoUpdate = useRecoilValue(isTodoUpdateState);
  const updateTodoInfo = useRecoilValue(updateTodoInfoState);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const [personName, setPersonName] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const { data: memebersData, isLoading: isMembersLoading } = useQuery<
    UserType[]
  >("getClubMembers", () => getClubMembers(clubID || ""), {
    onSuccess: (data) => {
      const temp: string[] = [];
      data.forEach((member) => temp.push(member.name));
      names = temp;
    },
    onError: (error: any) => alert(error.response.data.error),
  });

  const { data: tagsData, isLoading: isTagsLoading } = useQuery<ToDoTagType[]>(
    "getTodoTagsByClubID",
    () => getTodoTagsByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        const temp: string[] = [];
        data.forEach((tag) => temp.push(tag.name));
        rawTags = temp;
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const [date, setDate] = useState<string | null>("");

  const handleDateChange = (newDate: string | null) => {
    setDate(moment(newDate).format("YYYY-MM-DD"));
    console.log(moment(newDate).format("YYYY-MM-DD"));
  };

  const [startTime, setStartTime] = useState<string | null>("");

  const handleStartTimeChange = (startTime: string | null) => {
    setStartTime(moment(startTime).format("YYYY-MM-DD HH:mm"));
    console.log(moment(startTime).format("YYYY-MM-DD HH:mm"));
  };

  const [endTime, setEndTime] = useState<string | null>("");

  const handleEndTimeChange = (endTime: string | null) => {
    setEndTime(moment(endTime).format("YYYY-MM-DD HH:mm"));
    console.log(moment(endTime).format("YYYY-MM-DD HH:mm"));
  };

  const handleNameChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (isTodoUpdate) {
      setTitle(updateTodoInfo.title);
      setContent(updateTodoInfo.content);
      setPersonName(updateTodoInfo.attendingUsers);
      setTags(updateTodoInfo.tags);
      setDate(updateTodoInfo.date);
      setStartTime(updateTodoInfo.startTime);
      setEndTime(updateTodoInfo.endTime);
    }
  }, [isTodoUpdate]);

  const { mutate: createTodoMutate } = useMutation(
    (newTodo: NewToDoType) => createTodo(newTodo),
    {
      onSuccess: (data) => {
        // console.log(data);
        // console.log("success");
        window.location.reload();
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: updateTodoMutate } = useMutation(
    (todoInfo: UpdateTodoType) => updateTodo(todoInfo),
    {
      onSuccess: (data) => {
        window.location.reload();
      },
      onError: (error) => console.log(error),
    }
  );

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const tempSelectedTags = tagsStore.filter((tag) => tags.includes(tag.name));
    if (isTodoUpdate) {
      if (updateTodoInfo._id && clubID && date && startTime && endTime) {
        const newTodo = {
          _id: updateTodoInfo._id,
          clubId: clubID,
          title,
          content,
          date,
          startTime,
          endTime,
          attendingUsers: personName,
          tags: tags,
        };

        updateTodoMutate(newTodo);
      }
    } else {
      if (clubID && date && startTime && endTime) {
        const newTodo = {
          clubId: clubID,
          title,
          content,
          date,
          startTime,
          endTime,
          attendingUsers: personName,
          tags: tags,
        };

        createTodoMutate(newTodo);
      }
    }
  };

  const theme = useTheme();

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>일정 추가하기</DialogTitle>
      <NewTodoForm onSubmit={handleNewTodoSubmit}>
        <NewTodoInput
          id="standard-basic"
          label="일정 제목"
          variant="outlined"
          onChange={handleTitleChange}
          value={title}
          required
        />
        <NewTodoInput
          id="standard-basic"
          required
          label="일정 내용"
          onChange={handleContentChange}
          value={content}
          variant="outlined"
        />
        <DesktopDatePicker
          label="날짜 선택"
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField {...params} sx={{ marginBottom: "40px" }} />
          )}
        />
        <TimePicker
          label="시작 시간"
          value={startTime}
          onChange={handleStartTimeChange}
          renderInput={(params) => (
            <TextField {...params} sx={{ marginBottom: "40px" }} />
          )}
        />
        <TimePicker
          label="종료 시간"
          value={endTime}
          onChange={handleEndTimeChange}
          renderInput={(params) => (
            <TextField {...params} sx={{ marginBottom: "40px" }} />
          )}
        />

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">참여 동아리원</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleNameChange}
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
            {names.map((name, idx) => (
              <MenuItem
                key={idx}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">일정 카테고리</InputLabel>
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
        <NewTodoSumbitBtn type="submit" color="success" variant="outlined">
          {isTodoUpdate ? "일정 수정하기" : "일정 추가하기"}
        </NewTodoSumbitBtn>
      </NewTodoForm>
    </Dialog>
  );
}

export default TodoAddDialog;
