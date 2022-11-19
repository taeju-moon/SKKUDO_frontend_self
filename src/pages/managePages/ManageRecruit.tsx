import { useMutation, useQuery, useQueryClient } from "react-query";

import { AppliedUserType } from "../../types/apply";
import {
  deleteAppliedUser,
  deleteApplier,
  getAppliedUserByClubID,
  registerClub,
} from "../../utils/fetch";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  Card,
  Table,
  Stack,
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
import Scrollbar from "../../components/dashboardComponents/Scrollbar";
import UserListHead from "../../components/userComponents/UserListHead";
import Iconify from "../../components/Iconify";
import { useState } from "react";

import UserListToolbar from "../../components/userComponents/UserListToolbar";
import SearchNotFound from "../../components/userComponents/SearchNotFound";
import { filter } from "lodash";
import { RegisterInfoType } from "../../types/user";
import { HiDocumentText } from "react-icons/hi";
import DocumentDialog from "../../components/manageAuthComponents/DocumentDialog";
import { ColumnType } from "../../types/common";
import ApplierForm from "../../components/manageRecruitComponents/ApplierForm";

type orderType = "desc" | "asc";
type orderByType = "name" | "studentId" | "major";

const TABLE_HEAD = [
  { id: "name", label: "이름", alignRight: false },
  { id: "studentId", label: "학번", alignRight: false },

  { id: "major", label: "학과", alignRight: false },
];

function ManageRecruit() {
  const { clubID } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<AppliedUserType[]>(
    "getAppliedUserByClubID",
    () => getAppliedUserByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  interface RegisterMutateType {
    userID: string;
    registerInfo: RegisterInfoType;
  }
  const { mutate: registerMutate, isError } = useMutation(
    ({ userID, registerInfo }: RegisterMutateType) =>
      registerClub(userID, clubID || "", registerInfo),
    {
      // onSuccess: (data) => {
      //   console.log(data);
      // },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const { mutate: deleteMutate } = useMutation(
    (applyId: string) => deleteAppliedUser(applyId, clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries("getAppliedUserByClubID");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<orderByType>("name");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [clickedAppliedUser, setClickedAppliedUser] =
    useState<AppliedUserType>();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    console.log(selected);
  };

  function applySortFilter(
    array: AppliedUserType[] | undefined,
    comparator: (a: AppliedUserType, b: AppliedUserType) => number,
    query: string
  ) {
    if (array) {
      const stabilizedThis: [AppliedUserType, number][] = array.map(
        (el, index) => [el, index]
      );
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      if (query) {
        return filter(
          array,
          (_user) =>
            _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      }
      return stabilizedThis.map((el) => el[0]);
    } else {
      return [];
    }
  }

  function descendingComparator(
    a: AppliedUserType,
    b: AppliedUserType,
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
      ? (a: AppliedUserType, b: AppliedUserType) =>
          descendingComparator(a, b, orderBy)
      : (a: AppliedUserType, b: AppliedUserType) =>
          -descendingComparator(a, b, orderBy);
  }

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      if (data) {
        const newSelecteds = data.map((n) => n.name);
        setSelected(newSelecteds);
      }
      return;
    }
    setSelected([]);
  };

  const emptyRows = data
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data.length)
      : 0
    : 0;

  const handlePassBtnClick = (
    userID: string,
    moreColumns: {
      column: ColumnType;
      value: String;
    }[],
    applyId: string
  ) => {
    console.log(userID);
    registerMutate(
      {
        userID,
        registerInfo: { moreColumns, initialRole: "부원" },
      },
      {
        onSuccess: (data) => {
          deleteMutate(applyId);
        },
      }
    );
    // try {
    //   registerMutate({
    //     userID,
    //     registerInfo: { moreColumns, initialRole: "부원" },
    //   });
    // } catch (error) {
    //   alert(error);
    //   return;
    // }

    // deleteMutate(applyId);
    // if (!isError) {
    //   deleteMutate(applyId);
    // }
  };

  const handleFailBtnClick = (applyId: string) => {};

  const handleDocumentBtnClick = (idx: number) => {
    setIsDialogOpen(true);
    // console.log(data[idx]);
    if (data) {
      console.log(data[idx]);
      setClickedAppliedUser(data[idx]);
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
          User
        </Typography>
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
                rowCount={data?.length || 0}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, idx) => {
                    const { _id, studentId, name, major, userID, moreColumns } =
                      row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        // onClick={() => console.log("click")}
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
                            <Typography variant="h5" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: "20px" }} align="left">
                          {studentId}
                        </TableCell>

                        <TableCell sx={{ fontSize: "20px" }} align="left">
                          {major}
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ marginRight: "10px" }}
                            onClick={() => handleFailBtnClick(_id)}
                          >
                            불합격
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() =>
                              handlePassBtnClick(userID, moreColumns, _id)
                            }
                          >
                            합격
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <HiDocumentText
                            size="1.7rem"
                            onClick={() => handleDocumentBtnClick(idx)}
                          />
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
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <DocumentDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        applierInfo={clickedAppliedUser}
      />

      <ApplierForm></ApplierForm>
    </Container>
  );
}

export default ManageRecruit;
