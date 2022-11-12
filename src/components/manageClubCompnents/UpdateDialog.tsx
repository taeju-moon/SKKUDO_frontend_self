import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilValue } from "recoil";
import { clubUpdateState } from "../../atoms/alertAtom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocationType } from "../../types/common";
import { RecruitType } from "../../types/club";

interface UpdateDialogType {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProperInputType {
  keyword: string;
  handleClose: () => void;
}

function ProperInput({ keyword, handleClose }: ProperInputType) {
  const [name, setName] = React.useState("변경할 이름");
  const [location, setLocation] = React.useState<LocationType>("인사캠");
  const [recruitType, setRecruitType] = React.useState<RecruitType>("정규모집");
  const [date, setDate] = React.useState<Date>(new Date());

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setName(event.target.value);
  };

  const handleLocationChange = (event: SelectChangeEvent<LocationType>) => {
    event.preventDefault();
    setLocation(event.target.value as LocationType);
  };

  const handleRecruitTypeChange = (event: SelectChangeEvent<RecruitType>) => {
    event.preventDefault();
    setRecruitType(event.target.value as RecruitType);
  };

  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  if (keyword === "name" || keyword === "typeName") {
    return (
      <>
        <DialogContent style={{ width: "512px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="새로운 설정"
            fullWidth
            variant="standard"
            value={name}
            sx={{ marginTop: "20px" }}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>수정</Button>
        </DialogActions>
      </>
    );
  } else if (keyword === "location") {
    return (
      <>
        <DialogContent style={{ width: "512px" }}>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel id="location">소속 지역</InputLabel>
            <Select
              value={location}
              label="소속 지역"
              onChange={handleLocationChange}
            >
              <MenuItem value={"자과캠"}>자과캠</MenuItem>
              <MenuItem value={"인사캠"}>인사캠</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>수정</Button>
        </DialogActions>
      </>
    );
  } else if (keyword === "recruitType") {
    return (
      <>
        <DialogContent style={{ width: "512px" }}>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel id="recruitType">모집방식</InputLabel>
            <Select
              value={recruitType}
              label="모집 방식"
              onChange={handleRecruitTypeChange}
            >
              <MenuItem value={"정규모집"}>정규모집</MenuItem>
              <MenuItem value={"상시모집"}>상시모집</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>수정</Button>
        </DialogActions>
      </>
    );
  } else if (keyword === "recruitStart" || keyword === "recruitEnd") {
    return (
      <>
        <DialogContent style={{ width: "512px" }}>
          {/* <DialogContentText>변경하려는 값으로 적어주세요</DialogContentText> */}
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            {/* <InputLabel id="recruitType">모집방식</InputLabel> */}
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>수정</Button>
        </DialogActions>
      </>
    );
  } else {
    return <div></div>;
  }
}

export default function UpdateDialog({
  dialogOpen,
  setDialogOpen,
}: UpdateDialogType) {
  const handleClose = () => {
    setDialogOpen(false);
  };

  const clubUpdate = useRecoilValue(clubUpdateState);

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>{`${clubUpdate.keyword} 변경`}</DialogTitle>
      <ProperInput
        keyword={clubUpdate.keyword}
        handleClose={handleClose}
      ></ProperInput>
    </Dialog>
  );
}
