import { filter } from "lodash";
import { useState, useEffect } from "react";
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
import Scrollbar from "../../components/dashboard/Scrollbar";
import Iconify from "../../components/Iconify";
import UserListToolbar from "../../components/user/UserListToolbar";
import UserListHead from "../../components/user/UserListHead";
import UserMoreMenu from "../../components/user/UserMoreMenu";
import SearchNotFound from "../../components/user/SearchNotFound";
import ColumnModal from "../../components/user/ColumnModal/ColumnModal";
import { useQuery } from "react-query";
import { getClubMembers, getOneClub } from "../../utils/fetch";
import { UserType } from "../../types/user";
import { ClubType } from "../../types/club";
import { ColumnType } from "../../types/common";
import { applySortFilter, getComparator } from "../../utils/Sorting";

interface ITableHeadItem {
  id: string;
  label: string;
  alignRight: boolean;
}

const TABLE_HEAD: ITableHeadItem[] = [
  { id: "name", label: "이름", alignRight: false },
  { id: "studentId", label: "학번", alignRight: false },
  { id: "role", label: "역할", alignRight: false },
  { id: "major", label: "학과", alignRight: false },
  { id: "location", label: "위치", alignRight: false },
  { id: "contact", label: "연락처", alignRight: false },
];

type orderByType = "name" | "studentId" | "role" | "major" | "location";
type IMoreColumn = {
  column: ColumnType;
  value: String;
};

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<"desc" | "asc">("asc");

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState<orderByType>("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [tableHead, setTableHead] = useState<ITableHeadItem[]>(TABLE_HEAD);

  const [addColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);

  const { clubID } = useParams();

  const { data, isLoading } = useQuery<UserType[]>(
    "getClubMembers",
    () => getClubMembers(clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

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

  const emptyRows = data
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data.length)
      : 0
    : 0;

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy, clubID || ""),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  useEffect(() => {
    getOneClub(clubID || "")
      .then((club: ClubType) => {
        const userColumns: ITableHeadItem[] = club.userColumns.map((item) => {
          const elem: ITableHeadItem = {
            id: item.key,
            label: item.key,
            alignRight: false,
          };
          return elem;
        });
        setTableHead([...TABLE_HEAD, ...userColumns]);
      })
      .catch((error) => alert(error.error));
  }, []);
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
          color="success"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setColumnModalOpen(true)}
        >
          유저 열 추가
        </Button>
        <ColumnModal
          addColumnModalOpen={addColumnModalOpen}
          setColumnModalOpen={setColumnModalOpen}
        />
      </Stack>

      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              isManaging={true}
              order={order}
              orderBy={orderBy}
              headLabel={tableHead}
              rowCount={data?.length || 0}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    userID,
                    studentId,
                    name,
                    registeredClubs,
                    location,
                    major,
                    contact,
                  } = row;
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
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="h5" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {studentId}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {clubID && data
                          ? new Map(Object.entries(registeredClubs)).get(clubID)
                              ?.role
                          : ""}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {major}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {location}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {contact}
                      </TableCell>
                      {clubID && data
                        ? new Map(Object.entries(registeredClubs))
                            .get(clubID)
                            .moreColumns.map(
                              (item: IMoreColumn, index: any) => {
                                return (
                                  <TableCell
                                    sx={{ fontSize: "20px" }}
                                    key={index}
                                    align="left"
                                  >
                                    {item.value}
                                  </TableCell>
                                );
                              }
                            )
                        : ""}
                      <TableCell align="right">
                        <UserMoreMenu
                          userID={userID}
                          role={
                            clubID && data
                              ? new Map(Object.entries(registeredClubs)).get(
                                  clubID
                                )?.role
                              : ""
                          }
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
    </Container>
  );
}
