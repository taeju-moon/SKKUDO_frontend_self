import { useState } from "react";
export default function useTablePage(): [
  page: number,
  rowsPerPage: number,
  handleChangePage: (event: any, newPage: number) => void,
  handleChangeRowsPerPage: (event: any) => void
] {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage];
}
