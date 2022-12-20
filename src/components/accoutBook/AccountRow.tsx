import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { deleteBudgetRow } from "../../utils/fetch";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import UpdateRowDialog from "./UpdateRowDialog";
import moment from "moment";
import styled from "@emotion/styled";
import { BudgetRowType } from "../../types/budget";

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

export default function AccountRow({ row, rowIndex, budgetID }: RowType) {
  const [open, setOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const { clubID } = useParams();

  const queryClient = useQueryClient();

  const handleEditBtnClick = () => {
    setDialogOpen(true);
  };

  const { mutate: deleteRowMutate } = useMutation(
    () => deleteBudgetRow(rowIndex, budgetID, clubID || ""),
    {
      onSuccess: (data) => {
        alert("해당 항목을 삭제헸습니다");
        queryClient.invalidateQueries("getBudgetsByClubID");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const handleDeleteBtnClick = () => {
    deleteRowMutate();
  };
  return (
    <>
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
    </>
  );
}
