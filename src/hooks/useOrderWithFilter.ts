import { useState } from "react";
type orderByType = "name" | "studentId" | "role" | "major" | "location";

export default function useOrderWithFilter(): [
  order: "desc" | "asc",
  orderBy: orderByType,
  filterName: string,
  handleRequestSort: (event: any, property: any) => void,
  handleFilterByName: (event: any) => void
] {
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<orderByType>("name");
  const [filterName, setFilterName] = useState("");

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  return [order, orderBy, filterName, handleRequestSort, handleFilterByName];
}
