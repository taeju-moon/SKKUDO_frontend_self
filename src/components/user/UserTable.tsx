import {
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useOrderWithFilter from "../../hooks/useOrderWithFilter";
import useTableHead from "../../hooks/useTableHead";
import useTablePage from "../../hooks/useTablePage";
import { ColumnType } from "../../types/common";
import { UserType } from "../../types/user";
import { getClubMembers } from "../../utils/fetch";
import { applySortFilter, getComparator } from "../../utils/Sorting";
import SearchNotFound from "./SearchNotFound";
import UserListHead from "./UserListHead";
import UserListToolbar from "./UserListToolbar";
import UserMoreMenu from "./UserMoreMenu";

type IMoreColumn = {
  column: ColumnType;
  value: String;
};

interface UserTableType {
  isManage: boolean;
}
export default function UserTable({ isManage }: UserTableType) {
  const { clubID } = useParams();
  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePage();

  const [selected, setSelected] = useState<string[]>([]);

  const tableHead = useTableHead(isManage);

  const [order, orderBy, filterName, handleRequestSort, handleFilterByName] =
    useOrderWithFilter();

  const { data } = useQuery<UserType[]>(
    "getClubMembers",
    () => getClubMembers(clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

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

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy, clubID || ""),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

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

  return (
    <>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <UserListHead
            isManaging={isManage}
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
                    {isManage && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell>
                    )}

                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {name}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {studentId}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {clubID && data
                        ? new Map(Object.entries(registeredClubs)).get(clubID)
                            ?.role
                        : ""}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {major}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {location}
                    </TableCell>
                    {isManage && (
                      <TableCell
                        sx={{ fontSize: isManage ? "20px" : "13px" }}
                        align="left"
                      >
                        {contact}
                      </TableCell>
                    )}
                    {clubID && data
                      ? new Map(Object.entries(registeredClubs))
                          .get(clubID)
                          .moreColumns.map((item: IMoreColumn, index: any) => {
                            return (
                              <TableCell
                                sx={{ fontSize: isManage ? "20px" : "13px" }}
                                key={index}
                                align="left"
                              >
                                {item.value}
                              </TableCell>
                            );
                          })
                      : ""}
                    {isManage && (
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
                    )}
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
    </>
  );
}