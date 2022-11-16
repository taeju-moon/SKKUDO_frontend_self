import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getBudgetsByClubID, updateBudgetRow } from "../../utils/fetch";
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
} from "../../types/budget";
import moment from "moment";
import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styled from "@emotion/styled";
import UpdateRowDialog from "../../components/accoutBookComponents/UpdateRowDialog";

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

  const handleEditBtnClick = () => {
    setDialogOpen(true);
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
  const { data, isLoading } = useQuery<BudgetType>(
    "getBudgetsByClubID",
    () => getBudgetsByClubID(clubID || ""),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );
  return (
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
  );
}

function ManageAccountBook() {
  return <CollapsibleTable />;
}

export default ManageAccountBook;
