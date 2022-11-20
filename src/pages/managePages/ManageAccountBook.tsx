import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  createBudget,
  deleteBudget,
  deleteBudgetRow,
  getBudgetsByClubID,
  updateBudgetRow,
} from "../../utils/fetch";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
  BudgetRowType,
  BudgetType,
  NewBudgetRowType,
  NewBudgetType,
} from "../../types/budget";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import UpdateRowDialog from "../../components/accoutBookComponents/UpdateRowDialog";

const AccountBookPageContainer = styled.div`
  width: 100%;
`;

const DeleteBtn = styled(Button)({
  float: "right",
  fontSize: "20px",
  marginBottom: "50px",
});

const EditButton = styled(Button)({
  marginRight: "40px",
  height: "50px",
  marginBottom: "10px",
  width: "90px",
});
interface RowType {
  row: BudgetRowType;
  rowIndex: number;
  budgetID: string;
}
function Row({ row, rowIndex, budgetID }: RowType) {
  const [open, setOpen] = React.useState(false);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { clubID } = useParams();

  const handleEditBtnClick = () => {
    setDialogOpen(true);
  };

  const { mutate: deleteRowMutate } = useMutation(
    () => deleteBudgetRow(rowIndex, budgetID, clubID || ""),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  const handleDeleteBtnClick = () => {
    deleteRowMutate();
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontSize: "20px" }} component="th" scope="row">
          {moment(row.date).format("YYYY-MM-DD")}
        </TableCell>
        <TableCell sx={{ fontSize: "20px" }} align="right">
          {row.income}
        </TableCell>
        <TableCell sx={{ fontSize: "20px" }} align="right">
          {row.expense}
        </TableCell>
        <TableCell sx={{ fontSize: "20px" }} align="right">
          {row.whom}
        </TableCell>
        <TableCell sx={{ fontSize: "20px" }} align="right">
          {row.content}
        </TableCell>
        <TableCell sx={{ fontSize: "20px" }} align="right">
          {row.balance}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
          colSpan={7}
        >
          <Collapse in={open} timeout="auto" unmountOnExit sx={{}}>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon></ListItemIcon>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "20px" }}
                  primary={`계좌번호: ${row.account}`}
                />
              </ListItemButton>
            </List>

            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon></ListItemIcon>

                <ListItemText
                  disableTypography
                  sx={{ fontSize: "20px" }}
                  primary={`메모: ${row.note}`}
                />
              </ListItemButton>
            </List>
            <List component="div" disablePadding sx={{ textAlign: "end" }}>
              <EditButton
                onClick={handleDeleteBtnClick}
                variant="outlined"
                color="error"
              >
                삭제하기
              </EditButton>
              <EditButton onClick={handleEditBtnClick} variant="outlined">
                수정하기
              </EditButton>
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
      <UpdateRowDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        rowIndex={rowIndex}
        row={row}
        budgetID={budgetID}
      />
    </React.Fragment>
  );
}

function CollapsibleTable() {
  const { clubID } = useParams();
  const queryClient = useQueryClient();
  const [nameDialogOpen, setNameDialogOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleClose = () => {
    setNameDialogOpen(false);
  };
  const { data, isLoading } = useQuery<BudgetType>(
    "getBudgetsByClubID",
    () => getBudgetsByClubID(clubID || ""),
    {
      onSuccess: (data) => console.log(data),
      onError: (error: any) => {
        alert(error.response.data.error);
      },
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
  const { mutate: deleteBudgetMutate } = useMutation(
    () => deleteBudget(data?._id || "", clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
        alert("가계부가 삭제되었습니다.");
        window.location.reload();
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: createBudgetMutate } = useMutation(
    (newBudgetInfo: NewBudgetType) => createBudget(newBudgetInfo),
    {
      onSuccess: (data) => {
        console.log(data);
        alert("가계부가 성공적으로 생성되었습니다!");
        window.location.reload();
        // queryClient.invalidateQueries("getBudgetByClubID");
      },
      onError: (error) => console.log(error),
    }
  );

  const handleDeleteBtnClick = () => {
    if (data) {
      deleteBudgetMutate();
    } else {
      alert("예상치 못한 오류가 발생했습니다!");
    }
  };

  const handleCreateBtnClick = () => {
    if (clubID) {
      createBudgetMutate({
        clubId: clubID,
        name: newName,
        rows: [
          {
            date: new Date(), //날짜
            income: "0", //수입
            expense: "0", //지출
            whom: "이름", //Who/m
            content: "주 내용", //내용
            balance: "0", //잔액
            note: "메모", //비고
            account: "계좌 번호", //사용계좌}]})
          },
        ],
      });
    }
  };

  return (
    <AccountBookPageContainer>
      {data ? (
        <DeleteBtn
          color="error"
          variant="contained"
          onClick={handleDeleteBtnClick}
        >
          가계부 삭제
        </DeleteBtn>
      ) : (
        <DeleteBtn
          color="success"
          variant="contained"
          onClick={() => setNameDialogOpen(true)}
        >
          새 가계부 생성
        </DeleteBtn>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontSize: "24px" }}>날짜</TableCell>
              <TableCell sx={{ fontSize: "24px" }} align="right">
                수입
              </TableCell>
              <TableCell sx={{ fontSize: "24px" }} align="right">
                지출
              </TableCell>
              <TableCell sx={{ fontSize: "24px" }} align="right">
                누가
              </TableCell>
              <TableCell sx={{ fontSize: "24px" }} align="right">
                내용
              </TableCell>
              <TableCell sx={{ fontSize: "24px" }} align="right">
                잔액
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? null
              : data?.rows.map((row, index) => (
                  <Row
                    key={row._id}
                    row={row}
                    rowIndex={index}
                    budgetID={data?._id}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={nameDialogOpen} onClose={handleClose}>
        <DialogTitle sx={{ width: "600px" }}>새 가계부 이름</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleCreateBtnClick}>생성하기</Button>
        </DialogActions>
      </Dialog>
    </AccountBookPageContainer>
  );
}

function ManageAccountBook() {
  return <CollapsibleTable />;
}

export default ManageAccountBook;
