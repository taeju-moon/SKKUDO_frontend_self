import { filter } from "lodash";
// import { sentenceCase } from "change-case";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
// import Label from "../components/Label";
// import Scrollbar from '../../components/daScrollbar';
// import Iconify from '../components/Iconify';
// import SearchNotFound from "../components/SearchNotFound";
// import {
//   UserListHead,
//   UserListToolbar,
//   UserMoreMenu,
// } from "../sections/@dashboard/user";
// mock
// import USERLIST from "../_mock/user";
import Scrollbar from "../../components/dashboardComponents/Scrollbar";
import Iconify from "../../components/Iconify";
import UserListToolbar from "../../components/userComponents/UserListToolbar";
import UserListHead from "../../components/userComponents/UserListHead";
import UserMoreMenu from "../../components/userComponents/UserMoreMenu";
import Label from "../../components/userComponents/Label";
import SearchNotFound from "../../components/userComponents/SearchNotFound";
// import { MemberType } from "../../types/user";

// ----------------------------------------------------------------------

interface MemberType {
  _id: string;
  studentId: string;
  name: string;
  status: "active" | "banned";
  role: string;
  major: string;
}
const USERLIST: MemberType[] = [
  {
    _id: "1",
    studentId: "123123",

    name: "eric",

    status: "active",
    role: "회장",
    major: "메타버스학과",
  },
  {
    _id: "2",
    studentId: "1212",
    name: "tonny",
    status: "banned",
    role: "부회장",
    major: "소맥학과",
  },
];

const TABLE_HEAD = [
  { id: "name", label: "이름", alignRight: false },
  { id: "studentId", label: "학번", alignRight: false },
  { id: "role", label: "역할", alignRight: false },
  { id: "major", label: "학과", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
];

// ----------------------------------------------------------------------

type orderType = "desc" | "asc";
type orderByType = "name" | "studentId" | "role" | "major" | "status";

function descendingComparator(
  a: MemberType,
  b: MemberType,
  orderBy: orderByType
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: orderType, orderBy: orderByType) {
  return order === "desc"
    ? (a: MemberType, b: MemberType) => descendingComparator(a, b, orderBy)
    : (a: MemberType, b: MemberType) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: MemberType[],
  comparator: (a: MemberType, b: MemberType) => number,
  query: string
) {
  const stabilizedThis: [MemberType, number][] = array.map((el, index) => [
    el,
    index,
  ]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<"desc" | "asc">("asc");

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState<orderByType>("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          User
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { _id, studentId, name, role, status, major } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{studentId}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">{major}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={
                              (status === "banned" && "error") || "success"
                            }
                          >
                            {/* {sentenceCase(status)} */}
                            {status}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={USERLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
